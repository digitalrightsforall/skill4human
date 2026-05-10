require('dotenv').config();
const axios = require('axios');

const API_BASE = 'https://www.skillhub.club/api/v1';
const API_KEY = process.env.SKILLHUB_API_KEY;

async function getCategories() {
    try {
        const res = await axios.get(`${API_BASE}/skills/catalog`, {
            params: { limit: 100 }, // 通过大列表观察 category 字段
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });
        
        const skills = res.data.skills || [];
        const cats = new Set(skills.map(s => s.category).filter(Boolean));
        console.log('Detected categories in catalog:', Array.from(cats));
    } catch (err) {
        console.error('Error:', err.message);
    }
}

getCategories();
