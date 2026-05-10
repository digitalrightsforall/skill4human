import axios from 'axios';

async function testLLM() {
    try {
        const res = await axios.post('https://www.skillhub.club/api/v1/chat/completions', {
            model: 'gemini-2.5-pro', // or whatever is default
            messages: [{ role: 'user', content: 'hello' }]
        }, {
            headers: { 'Authorization': `Bearer sk-skillhubs-LR9uO_f3I4-im-8eODd17tdcNIBFFoDl` }
        });
        console.log('LLM Success:', res.data.choices[0].message.content);
    } catch (e) {
        console.log('LLM Error:', e.response ? e.response.data : e.message);
    }
}
testLLM();