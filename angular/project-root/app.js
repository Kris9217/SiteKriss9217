document.getElementById('send-btn').addEventListener('click', () => {
    const userInput = document.getElementById('chat-input').value.trim();
    const userId = document.getElementById('user-id').value;
    if (userInput) {
        handleBotResponse(userInput, userId);
    }
});

document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('send-btn').click();
    }
});

async function handleBotResponse(userInput, userId) {
    const chatOutput = document.getElementById('chat-output');
    const debugOutput = document.getElementById('debug-output');

    debugOutput.innerHTML += `<div>Envoi de userInput: ${userInput}, userId: ${userId}</div>`;

    chatOutput.innerHTML += `<div class="user-message"><strong>Vous:</strong> ${userInput}</div>`;
    document.getElementById('chat-input').value = '';

    try {
        const response = await getOpenAIResponse(userInput);

        debugOutput.innerHTML += `<div>Réponse reçue: ${response}</div>`;

        chatOutput.innerHTML += `<div class="bot-message"><strong>Bot:</strong> ${response}</div>`;
        chatOutput.scrollTop = chatOutput.scrollHeight;
    } catch (error) {
        debugOutput.innerHTML += `<div>Erreur: ${error.message}</div>`;
    }
}

async function getOpenAIResponse(userInput) {
    const openai_api_key = 'YOUR_OPENAI_API_KEY';
    const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openai_api_key}`
    };

    const data = {
        prompt: userInput,
        max_tokens: 150,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: null
    };

    const response = await axios.post(url, data, { headers });
    return response.data.choices[0].text.trim();
}
