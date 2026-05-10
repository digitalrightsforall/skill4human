import axios from 'axios';

const API_KEY = 'sk_live_skillsmp_bM5t4UC9UnC8DNkkIoa-ml0wtYu6CBIh11T99i7UfCI';
const BASE_URL = 'https://skillsmp.com';

async function test() {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/skills/search`, {
            params: { q: 'writing', limit: 5 },
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });
        console.log('Response Structure:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}
test();
