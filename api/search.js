const fetch = require('node-fetch');

// This is a serverless function for Vercel
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q, ll } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Search query (q) is required' });
  }

  // Get API key from environment variables
  const SERPAPI_KEY = process.env.SERPAPI_API_KEY;
  
  if (!SERPAPI_KEY) {
    console.error("SERPAPI_API_KEY is not defined");
    return res.status(500).json({ error: 'API configuration error' });
  }

  try {
    // Build SerpApi URL
    let apiUrl = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(q)}&type=search&api_key=${SERPAPI_KEY}`;
    if (ll) {
      apiUrl += `&ll=${encodeURIComponent(ll)}`;
    }
    
    // Call SerpApi
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();

    // Return results
    res.json(data);
  } catch (error) {
    console.error('Error calling SerpApi:', error);
    res.status(500).json({ error: 'Failed to fetch data from the service' });
  }
}
