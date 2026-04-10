import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const MUAPI_KEY = process.env.MUAPI_KEY;
const MUAPI_BASE = 'https://api.muapi.ai';

const CREDIT_COSTS = {
  image: 1,
  video: 5,
  lipsync: 5,
  cinema: 1,
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // 1. Verify user
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Not authenticated' });

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return res.status(401).json({ error: 'Invalid session' });

    // 2. Parse request
    const { endpoint, payload, type } = req.body;
    if (!endpoint || !payload) return res.status(400).json({ error: 'Missing endpoint or payload' });

    // 3. Check credits
    const creditCost = CREDIT_COSTS[type] || 1;
    const { data: creditData } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single();

    if (!creditData || creditData.credits < creditCost) {
      return res.status(402).json({ error: `Not enough credits. Need ${creditCost}, have ${creditData?.credits || 0}.` });
    }

    // 4. Submit to Muapi (no polling — just submit)
    const submitRes = await fetch(`${MUAPI_BASE}/api/v1/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': MUAPI_KEY },
      body: JSON.stringify(payload),
    });

    if (!submitRes.ok) {
      const errText = await submitRes.text();
      return res.status(submitRes.status).json({ error: `API error: ${errText.slice(0, 200)}` });
    }

    const submitData = await submitRes.json();
    const requestId = submitData.request_id || submitData.id;

    // 5. Deduct credits immediately
    await supabase
      .from('user_credits')
      .update({ credits: creditData.credits - creditCost })
      .eq('user_id', user.id);

    // 6. Log generation
    await supabase.from('generations').insert({
      user_id: user.id, type, endpoint,
      prompt: payload.prompt || '',
      credits_used: creditCost,
    });

    // 7. Return request_id so frontend can poll
    return res.status(200).json({ request_id: requestId, ...submitData });

  } catch (error) {
    console.error('Generate API error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
