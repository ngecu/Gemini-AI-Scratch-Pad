const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config

const genAI = new GoogleGenerativeAI("AIzaSyAfI1syH49uxIyfl2tAra-Fe7DadcELdxE");

async function run() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "Write a story about a magic backpack."
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  
//   run();