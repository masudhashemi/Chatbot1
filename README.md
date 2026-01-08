

# React ChatBot (Vanilla CDN Version)

A simple, beginner-friendly **ChatBot UI built with React (via CDN)** using JSX (Babel in-browser), basic state management, and a pluggable response engine.

This project is ideal for learning:

* React fundamentals without build tools
* Component-based UI design
* State & props flow
* Simple chatbot logic integration

---

## ✨ Features

* 💬 Chat-style interface (User vs Bot messages)
* ⚛️ React functional components with Hooks
* 🔁 Auto-scroll to latest message
* 🧠 External chatbot logic (`response.js`)
* 🎨 Clean CSS-based layout
* 🆔 Unique message IDs using `crypto.randomUUID()`

---

## 📁 Project Structure

```
project-root/
│
├── index.html        # Main application file
├── react.js          # React library (CDN/local copy)
├── dom.js            # ReactDOM library
├── babel.js          # Babel for JSX support
├── response.js       # Chatbot response logic
│
├── image/
│   ├── bot.png       # Bot avatar
│   └── user.png      # User avatar
│
└── README.md         # Project documentation
```

---

## 🚀 How It Works (High-Level)

1. **App Component**

   * Holds the main `chatMessages` state
   * Renders the chat history and input box

2. **ChatMessages Component**

   * Displays all chat messages
   * Automatically scrolls to the latest message

3. **ChatMessage Component**

   * Renders individual messages
   * Chooses layout based on sender (`user` or `bot`)

4. **ChatInput Component**

   * Accepts user input
   * Sends messages
   * Fetches bot replies from `Chatbot.getResponse()`

5. **response.js**

   * Contains chatbot logic
   * Easily extendable for commands, sarcasm, fallback replies, etc.

---

## 🧠 State Flow Explained

```text
User types → ChatInput
        ↓
Updates chatMessages (user message)
        ↓
Calls Chatbot.getResponse()
        ↓
Updates chatMessages (bot reply)
        ↓
ChatMessages re-renders
```

React automatically updates the UI whenever the `chatMessages` state changes.

---

## 🧩 Key Components Breakdown

### App

* Root component
* Owns the chat state

### ChatMessages

* Uses `useRef` + `useEffect` to auto-scroll

### ChatMessage

* Conditional rendering for bot/user
* Avatar + message bubble

### ChatInput

* Controlled input field
* Handles send button click

---

## 🛠 Technologies Used

* **HTML5**
* **CSS3 (Flexbox)**
* **JavaScript (ES6+)**
* **React 18 (CDN)**
* **ReactDOM**
* **Babel (in-browser JSX transpiling)**

No build tools. No Node.js. No npm.

---

## 📦 External Dependencies (CDN-based)

```html
<script src="react.js"></script>
<script src="dom.js"></script>
<script src="babel.js"></script>
```

> ⚠️ Babel in-browser is for learning/demo purposes only.

---

## 🧪 Example Bot Logic (response.js)

```js
const Chatbot = {
  getResponse(input) {
    if (input.toLowerCase() === 'hi') return 'Hello! 👋';
    return "I'm not sure what you mean 🤖";
  }
};
```

You can expand this with:

* Keyword matching
* Random replies
* Sarcastic fallback responses

---

## 🎨 UI Behavior

* Messages align left/right based on sender
* Avatars appear automatically
* Chat container auto-scrolls
* Mobile-friendly layout (flex-based)

---

## 🔒 Notes & Limitations

* No backend (client-side only)
* Page refresh clears chat history
* Babel CDN not suitable for production

---

## 🌱 Possible Enhancements

* ⏎ Send message on Enter key
* 🕒 Typing indicator
* 💾 LocalStorage chat persistence
* 🤖 AI API integration (OpenAI, etc.)
* 🎭 Message animations
* 🌓 Dark mode

---

## 📜 License

Free to use for learning and personal projects.

---

## 🙌 Author Notes

This project is intentionally simple and educational.
Perfect for understanding **how React works without tooling overhead**.

Happy hacking! 🚀

