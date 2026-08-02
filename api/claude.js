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
    const { imageBlocks, prompt } = req.body;
    const API_KEY = process.env.ANTHROPIC_API_KEY;

    console.log('API Key present:', !!API_KEY);
    console.log('Prompt length:', prompt?.length);

    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    const content = imageBlocks ? [
      ...imageBlocks,
      { type: 'text', text: prompt }
    ] : [
      { type: 'text', text: prompt }
    ];

    const requestBody = {
      model: 'claude-sonnet-4-6',
      max_tokens: imageBlocks ? 1500 : 4000,
      messages: [
        { role: 'user', content }
      ]
    };

    console.log('Sending request to Anthropic...');

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
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: error.message });
  }
}
