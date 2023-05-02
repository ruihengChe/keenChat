const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) =>{
    //获取body中的数据
    const { prompt, size } = req.body;
    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: imageSize,
        },{
            proxy: {
                host: 'localhost',
                port: 7890,
            }
        });

        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl,
        });
    } catch (error) {
        if(error.response){
            console.log(error.response.data);
            console.log(error.response.status);
        } else {
            console.log(error.message);
        }

        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}

module.exports = {
    generateImage
}