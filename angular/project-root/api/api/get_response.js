const openai = require('openai');
require('dotenv').config();

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY); 

module.exports = async (req, res) => {
    const { userInput } = req.body;

    openai.apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await openai.Completion.create({
            engine: "davinci-codex",
            prompt: userInput,
            max_tokens: 150,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const botResponse = response.choices[0].text.trim();
        res.status(200).json({ response: botResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

