import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const user_input = document.querySelector(".text-input");
const submit = document.querySelector(".submit-btn");
const container = document.querySelector(".empty-chat");

async function run(prompt) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const modifiedText = text.replace(/\*/g, "");
  const bot_div = `
  <div class="bot-div" >
  <img class="bot-logo" src="images/logo_icon.png" alt="ask ai logo" />
  <pre>
   ${modifiedText}
  </pre>
</div>`;
  container.insertAdjacentHTML("beforeend", bot_div);
}

const prompt = (user_prompt) => {
  user_input.value = "";
  const user_div = ` <div class="user-div" >
    <pre>${user_prompt}</pre>
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

user_input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (user_input.value == "") alert("prompt is empty");
    else {
      prompt(user_input.value);
    }
  }
});
