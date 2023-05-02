const axios = require('axios');

async function callOpenAI(){
    const prompt = "请输出一段关于你的自我介绍：\n我是一个";
    const model = "text-davinci-002";
    const maxTokens = 5;

    const response = await axios.post(
        'https://api.openai.com/v1/engines/'+model+'/completions',
        {
            prompt: prompt,
            max_tokens: maxTokens
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + 'skxxx',
            },
        }
    );
    const text = response.data.choices[0].text.trim();
}

callOpenAI();