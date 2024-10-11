import GeminiModel from "./geminiModel.js";

class App {
  #chatContainer;
  #inputField;
  #submitBtn;
  #deleteBtn;
  #geminiModel;
  #localStorage;
  #data;
  constructor() {
    // selecting elements
    this.#chatContainer = document.querySelector(".chat-output");
    this.#inputField = document.querySelector(".user-input");
    this.#submitBtn = document.querySelector(".submit-button");
    this.#deleteBtn = document.querySelector(".delete-icon");
    this.#geminiModel = new GeminiModel();

    // loading existing conversation if exists
    this.#retrieveData();

    // focus on input field
    this.#inputFocus();

    // registering event listeners
    this.#inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.#UserText();
    });

    this.#submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.#UserText();
    });

    this.#deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.#deleteMsg();
    });
  }

  //   function definitions
  #UserText = function () {
    const prompt = this.#inputField.value;

    // validation
    if (!prompt) return alert("Please enter a valid prompt");

    // function call for inserting user text
    this.#insertText(prompt);

    // function call for disabling input field
    this.#disableInputField();

    // clearing input field
    this.#inputField.value = "";

    // function call for generating AI response
    this.#aiText(prompt);
  };

  #aiText = function (prompt = "") {
    const formattedText = this.#geminiModel
      .getAIResponse(prompt)
      .then((text) => {
        // function call for inserting AI text
        this.#insertText(text, "ai");
        this.#storeData(prompt, text);
      })
      .catch((error) => {
        // function call for inserting error
        this.#insertText(error, "ai");
        this.#storeData(prompt, error);
      })
      .finally(() => {
        // storing result into local storage
        this.#enableInputField();
      });
  };

  #insertText = function (prompt = "", type = "user") {
    const Text = `<div class="${type} text">
                    <p>
                      ${prompt}
                    </p>
                  </div>`;

    // inserting user text into container
    this.#chatContainer.insertAdjacentHTML("beforeend", Text);

    // function call for scrolling text
    this.#scrollText();
  };

  #scrollText = function () {
    this.#chatContainer.scrollTo({
      top: this.#chatContainer.scrollHeight,
      behavior: "smooth",
    });
  };

  #inputFocus = function () {
    this.#inputField.focus();
  };

  #deleteMsg = function () {
    if (confirm("Do you want to delete all your messages?")) {
      // function call for deleting messages
      this.#deleteData();
      this.#chatContainer.innerHTML = "";
    }
  };

  // Function to disable button and input field
  #disableInputField = function () {
    this.#submitBtn.disabled = true;
    this.#inputField.disabled = true;
  };

  // Function to enable button and input field
  #enableInputField = function () {
    this.#submitBtn.disabled = false;
    this.#inputField.disabled = false;

    // focus on input field
    this.#inputFocus();
  };

  //   function to store data into local storage
  #storeData = function (userText, aiText) {
    this.#data = {
      userText: userText,
      aiText: aiText,
    };

    // Get existing conversations from local storage
    const existingConversations = localStorage.getItem("conversations");

    // If there are existing conversations, parse them into an array
    const conversations = existingConversations
      ? JSON.parse(existingConversations)
      : [];

    // Add the new conversation to the array
    conversations.push(this.#data);

    // Convert the updated array back to a JSON string and store it
    localStorage.setItem("conversations", JSON.stringify(conversations));
  };

  // Function to retrieve data from local storage
  #retrieveData = function () {
    // Get the JSON string from local storage
    const dataString = localStorage.getItem("conversations");

    // Check if data exists
    if (dataString) {
      // Parse the JSON string back into an array of objects
      const conversations = JSON.parse(dataString);
      conversations.forEach((conversation) => {
        this.#insertText(conversation.userText, "user");
        this.#insertText(conversation.aiText, "ai");
      });
    }
  };

  #deleteData = function () {
    localStorage.clear();
  };
}

// initialising App
const app = new App();
