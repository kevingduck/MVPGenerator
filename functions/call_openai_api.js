import fetch from "node-fetch";

exports.handler = async function (event, context) {
  const openaiApiKey = "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";
  const openaiApiUrl = "https://api.openai.com/v1/chat/completions";
  const userMessage = JSON.parse(event.body).userMessage;

  const messages = [
    {
      "role": "system",
      "content": "You are a helpful assistant.",
    },
    {
      "role": "user",
      "content": userMessage,
    },
  ];

  const response = await fetch(openaiApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + openaiApiKey,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      messages: messages,
      temperature: 0.7,
    }),
  });

  const result = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ systemMessage: result.choices[0].message.text.trim() }),
  };
};
