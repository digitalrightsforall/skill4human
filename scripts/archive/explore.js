require('dotenv').config();
const axios = require('axios');

const API_BASE = 'https://www.skillhub.club/api/v1';
const API_KEY = process.env.SKILLHUB_API_KEY;

async function explore() {
    try {
        console.log('Exploring recent skills to check category names...');
        const res = await axios.get(`${API_BASE}/skills/catalog`, {
            params: { limit: 10, sort: 'recent' },
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });
        
        const skills = res.data.data || [];
        if (skills.length > 0) {
            console.log('Sample skill categories:', skills.map(s => s.category));
            console.log('Sample skill data:', JSON.stringify(skills[0], null, 2));
        } else {
            console.log('No skills found even for recent list.');
        }
    } catch (err) {
        console.error('Error during exploration:', err.response ? err.response.data : err.message);
    }
}

explore();
