const MUAPI_KEY = process.env.MUAPI_KEY;
const MUAPI_BASE = 'https://api.muapi.ai';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing request id' });

  try {
    const pollRes = await fetch(`${MUAPI_BASE}/api/v1/predictions/${id}/result`, {
      headers: { 'Content-Type': 'application/json', 'x-api-key': MUAPI_KEY },
    });

    if (!pollRes.ok) {
      return res.status(200).json({ status: 'processing' });
    }

    const data = await pollRes.json();
    const status = data.status?.toLowerCase();

    if (['completed', 'succeeded', 'success'].includes(status)) {
      const url = data.outputs?.[0] || data.url || data.output?.url;
      return res.status(200).json({ status: 'completed', url, ...data });
    }

    if (['failed', 'error'].includes(status)) {
      return res.status(200).json({ status: 'failed', error: data.error || 'Generation failed' });
    }

    return res.status(200).json({ status: 'processing' });
  } catch (error) {
    return res.status(200).json({ status: 'processing' });
  }
}
