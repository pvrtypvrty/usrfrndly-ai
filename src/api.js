/**
 * USRFRNDLY.AI — Muapi API Client
 * Handles authentication, image/video generation, polling, and file uploads.
 * Uses Vite proxy in dev mode, direct API URL in production.
 */

const BASE_URL = import.meta.env.DEV ? '' : 'https://api.muapi.ai';

export function getApiKey() {
  const key = localStorage.getItem('muapi_key');
  if (!key) throw new Error('Connect your API key first');
  return key;
}

export function setApiKey(key) {
  localStorage.setItem('muapi_key', key);
}

export function hasApiKey() {
  return !!localStorage.getItem('muapi_key');
}

/**
 * Poll for generation result
 */
async function pollForResult(requestId, key, maxAttempts = 150, interval = 2000) {
  const pollUrl = `${BASE_URL}/api/v1/predictions/${requestId}/result`;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, interval));

    try {
      const response = await fetch(pollUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
        },
      });

      if (!response.ok) {
        if (response.status >= 500) continue;
        const errText = await response.text();
        throw new Error(`Poll Failed: ${response.status} - ${errText.slice(0, 100)}`);
      }

      const data = await response.json();
      const status = data.status?.toLowerCase();

      if (['completed', 'succeeded', 'success'].includes(status)) {
        const url = data.outputs?.[0] || data.url || data.output?.url;
        return { ...data, url };
      }

      if (['failed', 'error'].includes(status)) {
        throw new Error(`Generation failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      if (attempt === maxAttempts) throw error;
    }
  }

  throw new Error('Generation timed out.');
}

/**
 * Submit a generation request and poll for results
 */
async function submitAndPoll(endpoint, payload) {
  const key = getApiKey();
  const url = `${BASE_URL}/api/v1/${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errText.slice(0, 100)}`);
  }

  const submitData = await response.json();
  const requestId = submitData.request_id || submitData.id;

  // Some endpoints return results directly
  if (!requestId) return submitData;

  return pollForResult(requestId, key);
}

/**
 * Generate an image (Text-to-Image)
 */
export async function generateImage({ model, prompt, aspect_ratio, resolution, quality, seed }) {
  const payload = { prompt };
  if (aspect_ratio) payload.aspect_ratio = aspect_ratio;
  if (resolution) payload.resolution = resolution;
  if (quality) payload.quality = quality;
  if (seed && seed !== -1) payload.seed = seed;
  return submitAndPoll(model, payload);
}

/**
 * Generate a video (Text-to-Video)
 */
export async function generateVideo({ model, prompt, aspect_ratio, duration, resolution, quality }) {
  const payload = {};
  if (prompt) payload.prompt = prompt;
  if (aspect_ratio) payload.aspect_ratio = aspect_ratio;
  if (duration) payload.duration = duration;
  if (resolution) payload.resolution = resolution;
  if (quality) payload.quality = quality;
  return submitAndPoll(model, payload);
}

/**
 * Process lip sync generation
 */
export async function processLipSync({ model, image_url, video_url, audio_url, resolution }) {
  const payload = {};
  if (audio_url) payload.audio_url = audio_url;
  if (image_url) payload.image_url = image_url;
  if (video_url) payload.video_url = video_url;
  if (resolution) payload.resolution = resolution;
  return submitAndPoll(model, payload);
}

/**
 * Upload a file and get hosted URL
 */
export async function uploadFile(file) {
  const key = getApiKey();
  const url = `${BASE_URL}/api/v1/upload_file`;
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'x-api-key': key },
    body: formData,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Upload failed: ${response.status} - ${errText.slice(0, 100)}`);
  }

  const data = await response.json();
  return data.url || data.file_url || data.data?.url;
}
