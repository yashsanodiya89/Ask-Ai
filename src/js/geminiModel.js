import { GoogleGenerativeAI } from "@google/generative-ai";

export default class GeminiModel {
  // insert your API KEY here.
  #API_KEY = "";
  #genAI;
  #model;
  constructor() {
    this.#genAI = new GoogleGenerativeAI(this.#API_KEY);
    this.#model = this.#genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  #generateAIResponse = async function (prompt = "") {
    try {
      const result = await this.#model.generateContent(prompt);
      const formattedText = marked.parse(result.response.text());
      return formattedText;
    } catch (error) {
      return new Error("Error in generating AI response, please try again.");
    }
  };

  getAIResponse(prompt) {
    return this.#generateAIResponse(prompt);
  }
}
