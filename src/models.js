/**
 * USRFRNDLY.AI — Model Catalog
 * 221 models across 7 categories
 */

export const TOTAL_MODELS = 221;

// ─── Homepage Category Display ───────────────────────────────
export const MODEL_CATEGORIES = [
  {
    label: 'Image Generation',
    count: 42,
    color: '#d9ff00',
    icon: '🖼',
    models: [
      'Midjourney V7', 'Flux Dev', 'Flux 2 Pro', 'Flux 2 Dev', 'Flux Schnell',
      'Google Imagen 4', 'Google Imagen 4 Ultra', 'Google Imagen 4 Fast',
      'Ideogram V3', 'GPT-4o', 'GPT Image 1.5', 'SeedDream V3', 'SeedDream V4',
      'SeedDream V4.5', 'SeedDream V5', 'HiDream Fast', 'HiDream Dev', 'HiDream Full',
      'SDXL', 'Nano Banana', 'Nano Banana 2', 'Nano Banana Pro',
      'Flux Kontext Dev', 'Flux Kontext Pro', 'Flux Kontext Max',
      'Hunyuan 2.1', 'Hunyuan 3.0', 'Chroma', 'Qwen Image', 'Reve',
      'Grok Imagine', 'Wan 2.1', 'Wan 2.5', 'Wan 2.6',
      'Vidu Q2', 'LeonardoAI Phoenix', 'LeonardoAI Lucid Origin',
      'Neta Lumina', 'Perfect Pony XL', 'Kling O1', 'Z-Image Turbo', 'AI Anime Generator',
    ],
  },
  {
    label: 'Video Generation',
    count: 68,
    color: '#00d4ff',
    icon: '🎬',
    models: [
      'Kling 3.0 Pro', 'Kling 2.6 Pro', 'Kling 2.5 Turbo', 'Kling 2.1 Master',
      'Veo 3.1', 'Veo 3.1 Fast', 'Veo 3', 'Veo 3 Fast',
      'Sora 2 Pro', 'Sora 2', 'Sora (Original)',
      'Runway Act Two', 'Runway T2V',
      'MiniMax Hailuo 2.3 Pro', 'MiniMax Hailuo 2.3 Standard', 'MiniMax 02 Pro',
      'Wan 2.6', 'Wan 2.5', 'Wan 2.5 Fast', 'Wan 2.2', 'Wan 2.1',
      'LTX 2 Pro', 'LTX 2 19B', 'LTX 2 Fast',
      'Seedance 2.0', 'Seedance 1.5 Pro', 'Seedance Lite',
      'PixVerse 5.5', 'PixVerse 5', 'PixVerse 4.5',
      'Grok Imagine', 'Hunyuan Fast', 'Hunyuan T2V',
      'LeonardoAI Motion 2.0', 'Vidu 2.0', 'OVI',
    ],
  },
  {
    label: 'Image-to-Image',
    count: 38,
    color: '#ff6b9d',
    icon: '🔄',
    models: [
      'Flux Kontext Pro I2I', 'Flux Kontext Max I2I', 'Flux Kontext Dev I2I',
      'Midjourney V7 I2I', 'GPT-4o Edit', 'GPT Image 1.5 Edit',
      'Nano Banana Edit', 'Nano Banana 2 Edit', 'Nano Banana Pro Edit',
      'Flux 2 Pro Edit', 'Flux 2 Dev Edit', 'Flux 2 Flex Edit',
      'SeedDream V4.5 Edit', 'SeedDream V5 Edit',
      'Qwen Image Edit', 'Qwen Image Edit Plus',
      'Ghibli Style', 'Face Swap', 'Dress Change', 'Skin Enhancer',
      'Product Photography', 'Product Shot', 'Background Remover',
      'Image Extension', 'Object Eraser', 'Color Photo',
      'Flux PuLID', 'Flux Redux', 'Flux Krea Dev',
      'Ideogram Reframe', 'Higgsfield Soul',
      'Wan 2.5 Edit', 'Wan 2.6 Edit', 'Reve Edit',
    ],
  },
  {
    label: 'Image-to-Video',
    count: 42,
    color: '#a78bfa',
    icon: '✨',
    models: [
      'Kling 3.0 I2V', 'Kling 2.6 I2V', 'Kling 2.5 Turbo I2V',
      'Kling 2.1 Master I2V', 'Kling 2.1 Pro I2V', 'Kling 2.1 Standard I2V',
      'Kling O1 I2V', 'Kling O1 Standard I2V',
      'Veo 3.1 I2V', 'Veo 3.1 Fast I2V', 'Veo 3 I2V', 'Veo 3 Fast I2V',
      'Runway I2V', 'Sora 2 I2V', 'Sora 2 Pro I2V',
      'MiniMax Hailuo 2.3 I2V', 'MiniMax 02 I2V',
      'Wan 2.6 I2V', 'Wan 2.5 I2V', 'Wan 2.5 Fast I2V', 'Wan 2.2 I2V', 'Wan 2.1 I2V',
      'Seedance 2.0 I2V', 'Seedance 1.5 I2V', 'Seedance Lite I2V',
      'PixVerse 5.5 I2V', 'PixVerse 5 I2V',
      'LTX 2 Pro I2V', 'LTX 2 Fast I2V',
      'Grok Imagine I2V', 'Hunyuan I2V',
      'Midjourney V7 I2V', 'LeonardoAI Motion I2V',
      'Vidu 2.0 I2V', 'OVI I2V', 'Higgsfield DOP',
    ],
  },
  {
    label: 'Lip Sync',
    count: 8,
    color: '#f472b6',
    icon: '🎙',
    models: [
      'Hailuo LipSync', 'Sync LipSync', 'LTX 2.3 LipSync',
      'Wan 2.2 Speech-to-Video', 'Createify LipSync',
      'VEED LipSync', 'Latent Sync', 'InfiniteTalk',
    ],
  },
  {
    label: 'Video Tools',
    count: 12,
    color: '#34d399',
    icon: '🛠',
    models: [
      'Watermark Remover', 'Topaz Image Upscaler', 'SeedVR2 Upscaler',
      'Background Remover', 'Object Eraser', 'Image Extension',
      'Video Effects', 'Image Effects', 'Motion Controls',
      'Color Photo', 'Add Watermark', 'VFX',
    ],
  },
  {
    label: 'Cinema & Reference',
    count: 11,
    color: '#fbbf24',
    icon: '🎥',
    models: [
      'Kling O1 Reference', 'Kling O1 Standard Reference',
      'Veo 3.1 Reference', 'MiniMax Subject Reference',
      'Midjourney V7 Style Ref', 'Midjourney V7 Omni Ref',
      'Vidu Q1 Reference', 'Vidu Q2 Reference',
      'Wan 2.1 Reference', 'Seedance Lite Reference',
      'Ideogram Character',
    ],
  },
];

// ─── Studio Model Arrays ─────────────────────────────────────
export const T2I_MODELS = [
  { id: 'nano-banana-pro', name: 'Nano Banana Pro', endpoint: 'nano-banana-pro', ars: ['1:1','3:4','4:3','9:16','16:9','3:2','2:3','5:4','4:5','21:9'] },
  { id: 'midjourney-v7-text-to-image', name: 'Midjourney V7', endpoint: 'midjourney-v7-text-to-image', ars: ['1:1','16:9','9:16','4:3','3:4'] },
  { id: 'flux-2-pro', name: 'Flux 2 Pro', endpoint: 'flux-2-pro', ars: ['1:1','16:9','9:16','4:3','3:4'] },
  { id: 'flux-schnell', name: 'Flux Schnell', endpoint: 'flux-schnell-image', ars: ['1:1','16:9','9:16','4:3','3:2'] },
  { id: 'flux-dev', name: 'Flux Dev', endpoint: 'flux-dev-image', ars: [] },
  { id: 'google-imagen4', name: 'Google Imagen 4', endpoint: 'google-imagen4', ars: ['1:1','16:9','9:16','4:3','3:4','3:2','2:3'] },
  { id: 'google-imagen4-ultra', name: 'Google Imagen 4 Ultra', endpoint: 'google-imagen4-ultra', ars: ['1:1','16:9','9:16','4:3','3:4'] },
  { id: 'ideogram-v3-t2i', name: 'Ideogram V3', endpoint: 'ideogram-v3-t2i', ars: ['1:1','16:9','9:16','4:3','3:4'] },
  { id: 'gpt4o-text-to-image', name: 'GPT-4o Image', endpoint: 'gpt4o-text-to-image', ars: ['1:1','16:9','9:16'] },
  { id: 'gpt-image-1.5', name: 'GPT Image 1.5', endpoint: 'gpt-image-1.5', ars: ['1:1','16:9','9:16'] },
  { id: 'bytedance-seedream-v4', name: 'SeedDream V4', endpoint: 'bytedance-seedream-v4', ars: ['1:1','16:9','9:16','4:3','3:4'] },
  { id: 'seedream-5.0', name: 'SeedDream V5', endpoint: 'seedream-5.0', ars: ['1:1','16:9','9:16','4:3','3:4'] },
  { id: 'hidream-i1-fast', name: 'HiDream Fast', endpoint: 'hidream-i1-fast', ars: ['1:1','16:9','9:16','4:3','3:4','3:2','2:3'] },
  { id: 'sdxl-image', name: 'SDXL', endpoint: 'sdxl-image', ars: [] },
  { id: 'flux-2-dev', name: 'Flux 2 Dev', endpoint: 'flux-2-dev', ars: ['1:1','16:9','9:16','4:3','3:4'] },
  { id: 'hunyuan-image-3.0', name: 'Hunyuan 3.0', endpoint: 'hunyuan-image-3.0', ars: ['1:1','16:9','9:16','4:3','3:4'] },
  { id: 'qwen-image', name: 'Qwen Image', endpoint: 'qwen-image', ars: ['1:1','16:9','9:16'] },
  { id: 'wan2.6-text-to-image', name: 'Wan 2.6', endpoint: 'wan2.6-text-to-image', ars: ['1:1','16:9','9:16'] },
];

export const T2V_MODELS = [
  { id: 'kling-v3.0-pro-text-to-video', name: 'Kling 3.0 Pro', endpoint: 'kling-v3.0-pro-text-to-video', ars: ['16:9','9:16','1:1'], durations: [5,10] },
  { id: 'veo3.1-text-to-video', name: 'Veo 3.1', endpoint: 'veo3.1-text-to-video', ars: ['16:9','9:16'], durations: [8] },
  { id: 'openai-sora-2-pro-text-to-video', name: 'Sora 2 Pro', endpoint: 'openai-sora-2-pro-text-to-video', ars: ['16:9','9:16','1:1'], durations: [5,10] },
  { id: 'minimax-hailuo-2.3-pro-t2v', name: 'MiniMax 2.3 Pro', endpoint: 'minimax-hailuo-2.3-pro-t2v', ars: ['16:9','9:16','1:1'], durations: [5,10] },
  { id: 'wan2.6-text-to-video', name: 'Wan 2.6', endpoint: 'wan2.6-text-to-video', ars: ['16:9','9:16','1:1'], durations: [5] },
  { id: 'seedance-v2.0-t2v', name: 'Seedance 2.0', endpoint: 'seedance-v2.0-t2v', ars: ['16:9','9:16','1:1'], durations: [5] },
  { id: 'runway-text-to-video', name: 'Runway Gen-3', endpoint: 'runway-text-to-video', ars: ['16:9','9:16','1:1'], durations: [5,10] },
  { id: 'kling-v2.6-pro-t2v', name: 'Kling 2.6 Pro', endpoint: 'kling-v2.6-pro-t2v', ars: ['16:9','9:16','1:1'], durations: [5,10] },
  { id: 'pixverse-v5.5-t2v', name: 'PixVerse 5.5', endpoint: 'pixverse-v5.5-t2v', ars: ['16:9','9:16','1:1'], durations: [5] },
  { id: 'ltx-2-pro-text-to-video', name: 'LTX 2 Pro', endpoint: 'ltx-2-pro-text-to-video', ars: ['16:9','9:16','1:1'], durations: [5] },
];

export const LIPSYNC_MODELS = [
  { id: 'sync-lipsync', name: 'Sync LipSync', endpoint: 'sync-lipsync', type: 'image' },
  { id: 'ltx-2.3-lipsync', name: 'LTX 2.3 LipSync', endpoint: 'ltx-2.3-lipsync', type: 'image' },
  { id: 'wan2.2-speech-to-video', name: 'Wan Speech-to-Video', endpoint: 'wan2.2-speech-to-video', type: 'video' },
  { id: 'veed-lipsync', name: 'VEED LipSync', endpoint: 'veed-lipsync', type: 'image' },
  { id: 'latent-sync', name: 'Latent Sync', endpoint: 'latent-sync', type: 'image' },
];

// ─── Quick Prompts & Enhance Tags ────────────────────────────
export const QUICK_PROMPTS = [
  { label: 'Portrait', prompt: 'Professional portrait photograph, shallow depth of field, soft studio lighting, 85mm lens' },
  { label: 'Landscape', prompt: 'Breathtaking landscape photograph, golden hour, wide angle, dramatic clouds, 4K' },
  { label: 'Fantasy', prompt: 'Epic fantasy scene, magical atmosphere, volumetric lighting, highly detailed, concept art' },
  { label: 'Sci-Fi', prompt: 'Futuristic sci-fi environment, neon lights, cyberpunk city, rain reflections, cinematic' },
  { label: 'Fashion', prompt: 'High fashion editorial, avant-garde styling, studio lighting, Vogue aesthetic, professional' },
  { label: 'Product', prompt: 'Commercial product photography, clean white background, studio lighting, professional' },
];

export const ENHANCE_TAGS = {
  quality: ['ultra-detailed', '8K resolution', 'award-winning'],
  lighting: ['cinematic lighting', 'golden hour', 'neon glow'],
  mood: ['moody atmosphere', 'epic and dramatic', 'dark and mysterious'],
  style: ['photorealistic', 'concept art', 'anime style'],
};

// ─── Cinema Studio Data ──────────────────────────────────────
export const CAMERA_MAP = {
  'Modular 8K Digital': 'modular 8K digital cinema camera',
  'Full-Frame Cine': 'full-frame digital cinema camera',
  'Grand Format 70mm': 'grand format 70mm film camera',
  'Studio S35': 'Super 35 studio digital camera',
  'Classic 16mm Film': 'classic 16mm film camera',
};

export const LENS_MAP = {
  'Creative Tilt': 'creative tilt lens effect',
  'Compact Anamorphic': 'compact anamorphic lens',
  'Extreme Macro': 'extreme macro lens',
  '70s Cinema Prime': '1970s cinema prime lens',
  'Classic Anamorphic': 'classic anamorphic lens',
  'Premium Modern': 'premium modern prime lens',
};
