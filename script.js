import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCevYIJo9DpHrzrHTIkFsMPzF3oQht0anE";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const user_input = document.querySelector(".text-input");
const submit = document.querySelector(".submit-btn");
const container = document.querySelector(".empty-chat");

async function run(prompt) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const bot_div = `<div class="bot-div">
  <p>
   ${text}
  </p>
</div>`;
  container.insertAdjacentHTML("beforeend", bot_div);
}

const prompt = (user_prompt) => {
  user_input.value = "";

  const user_div = ` <div class="user-div">
    <p>${user_prompt}</p>
    </div>`;
  container.insertAdjacentHTML("beforeend", user_div);
  run(user_prompt);
};

submit.addEventListener("click", function () {
  if (user_input.value == "") alert("prompt is empty");
  else {
    prompt(user_input.value);
  }
});
