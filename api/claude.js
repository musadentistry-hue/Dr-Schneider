export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const API_KEY = process.env.ANTHROPIC_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    // Support two payload styles:
    // 1) { imageBlocks, prompt }
    // 2) { model, max_tokens, messages }
    const { imageBlocks, prompt, model, max_tokens, messages } = req.body || {};

    let requestBody;

    const hasNativeMessages = Array.isArray(messages) && messages.length > 0;
    if (hasNativeMessages) {
      requestBody = {
        model: model || 'claude-sonnet-4-6',
        max_tokens: max_tokens || 4000,
        messages
      };
    } else {
      const textPrompt = typeof prompt === 'string' ? prompt : '';
      const blocks = Array.isArray(imageBlocks) ? imageBlocks : [];

      if (!textPrompt && blocks.length === 0) {
        return res.status(400).json({ error: 'Invalid payload: provide either messages[] or prompt/imageBlocks.' });
      }

      const content = blocks.length
        ? [...blocks, { type: 'text', text: textPrompt }]
        : [{ type: 'text', text: textPrompt }];

      requestBody = {
        model: 'claude-sonnet-4-6',
        max_tokens: blocks.length ? 1500 : 4000,
        messages: [{ role: 'user', content }]
      };
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic error:', data);
      return res.status(response.status).json({
        error: data?.error?.message || 'API error',
        details: data
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: error.message });
  }
}
