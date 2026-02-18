const { OpenAI } = require('openai');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.error('❌ Error: OPENAI_API_KEY is not set in the .env file.');
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: apiKey,
});

async function testConnection() {
    console.log('Testing OpenAI API connection...');
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Say 'Success!' if you can hear me." }],
            max_tokens: 10,
        });

        console.log('✅ Connection Successful!');
        console.log('Response:', response.choices[0].message.content);
    } catch (error) {
        console.error('❌ Connection Failed!');
        console.error('Error details:', error.message);
    }
}

testConnection();
