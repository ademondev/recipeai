import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import promptPreProcess from './promptPreProcess';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT: number = Number(process.env?.PORT) || 5000;
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
const MAX_TOKENS = 2000;

app.use(express.json());

app.post('/completion', async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${req.body.message}`,
            max_tokens: MAX_TOKENS
        });
        console.log(req.body.message)
        return res.status(200).json({
            success: true,
            data: response.data.choices[0].text
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.response
                ? error.response.data
                : "Something went wrong"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});