import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import promptPreProcess from './promptPreProcess.js';
import { extractRecipeDataFromResponse } from './promptPreProcess.js';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT: number = Number(process.env?.PORT) || 5000;
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
const MAX_TOKENS = 2000;

app.use(express.json());
app.use(cors());

app.post('/completion', async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${promptPreProcess(req.body.message)}`,
            max_tokens: MAX_TOKENS
        });
        console.log(req.body.message);
        const processedData = extractRecipeDataFromResponse(response.data.choices[0].text === undefined ? '' : response.data.choices[0].text);
        console.log(processedData === null ? 'There was an error' : processedData)
        return res.status(200).json({
            success: true,
            data: processedData
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