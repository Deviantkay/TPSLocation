// File: server.js

const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Ambil SerpApi Key dari .env. SANGAT AMAN.
const SERPAPI_KEY = process.env.SERPAPI_API_KEY;

if (!SERPAPI_KEY) {
    console.error("FATAL ERROR: SERPAPI_API_KEY is not defined in .env file.");
    process.exit(1);
}

// Sajikan semua file dari folder 'public'
app.use(express.static('public'));

// Endpoint API yang akan dihubungi oleh front-end
app.get('/api/search', async (req, res) => {
    const { q, ll } = req.query;
    if (!q) {
        return res.status(400).json({ error: 'Search query (q) is required' });
    }

    try {
        // Buat URL untuk SerpApi, menyertakan API Key rahasia
        let apiUrl = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(q)}&type=search&api_key=${SERPAPI_KEY}`;
        if (ll) {
             apiUrl += `&ll=${encodeURIComponent(ll)}`;
        }
        
        // Hubungi SerpApi DARI SERVER
        const apiResponse = await fetch(apiUrl);
        const data = await apiResponse.json();

        // Kirim kembali hasilnya ke front-end
        res.json(data);
    } catch (error) {
        console.error('Error proxying to SerpApi:', error);
        res.status(500).json({ error: 'Failed to fetch data from the service' });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running. Open http://localhost:${PORT} in your browser.`);
});