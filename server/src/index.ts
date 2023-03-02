import express from 'express';
import serverless from 'serverless-http';
import { Configuration, OpenAIApi } from 'openai';
import promptPreProcess from './promptPreProcess.js';
import { extractRecipeDataFromResponse } from './promptPreProcess.js';
import * as dotenv from 'dotenv';
import cors from 'cors';
import GoogleImages from 'google-images';
dotenv.config();

// Express config
const app = express();
const PORT: number = Number(process.env?.PORT) || 5000;
const router = express.Router();
app.use('/.netlify/functions/index', router);

// OpenAI config
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
const MAX_TOKENS = 2000;

// Google Images config
const CSE_ID = `${process.env.GOOGLE_PROGRAMMABLE_SEARCH_ENGINE}`;
const API_KEY = `${process.env.GOOGLE_API_KEY}`;
const imagesClient = new GoogleImages(CSE_ID, API_KEY);


app.use(express.json());

// For some reason, req.body of all requests is a Uint8Array, so we need to parse it to JSON
function parseJsonByteArray(byteArray: Uint8Array): any {
    const decoder = new TextDecoder('utf-8');
    const jsonString = decoder.decode(byteArray);
    return JSON.parse(jsonString);
}

router.post('/completion', async (req, res) => {
    try {
        console.log('request body: ', req.body);
        const parsed = parseJsonByteArray(req.body);
        console.log('parsed body: ', parsed);
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${promptPreProcess(parsed.message)}`,
            max_tokens: MAX_TOKENS
        });
        const processedData = extractRecipeDataFromResponse(response.data.choices[0].text === undefined ? '' : response.data.choices[0].text);
        console.log(processedData === null ? 'There was an error' : processedData);
        res.setHeader('Access-Control-Allow-Origin', 'https://recipeai-lab.netlify.app');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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

router.post('/images', async (req, res) => {
    try {
        const searchTerm = parseJsonByteArray(req.body).searchTerm;
        console.log('searchTerm: ', searchTerm);
        console.log('request body: ', req.body);
        console.log('parsed json array: ', parseJsonByteArray(req.body));
        const response = await imagesClient.search(searchTerm);
        console.log(response);
        return res.status(200).json({
            success: true,
            data: response
        })
    } catch (error:any) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.response
                ? error.response.data
                : "Something went wrong"
        });
    }
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

export const handler = serverless(app);