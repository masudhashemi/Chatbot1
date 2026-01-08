/*
This is example code from supersimple dev - https://supersimpledev.com
there might be some changes here but the original code can be found in 
https://unpkg.com/supersimpledev@8.6.4/chatbot.js

*/
// This is a simple chatbot used for SuperSimpleDev
// coding tutorials: https://youtube.com/@SuperSimpleDev

const Chatbot = {
    defaultResponses: {
        'hello hi': `Hello! How can I help you?`,
        ' hi': `Hello! How can I help you?`,
        'how are you': function () {
            const replies = [
                "I'm doing great! 😄",
                "Feeling helpful as always 🤖",
                "All good here! What can I do for you?"
            ];
            return replies[Math.floor(Math.random() * replies.length)];
        },
        'flip a coin': function () {
            const randomNumber = Math.random();
            if (randomNumber < 0.5) {
                return 'Sure! You got heads';
            } else {
                return 'Sure! You got tails';
            }
        },
        'roll a dice': function () {
            const diceResult = Math.floor(Math.random() * 6) + 1;
            return `Sure! You got ${diceResult}`;
        },
        'what is the date today': function () {
            const now = new Date();
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            const month = months[now.getMonth()];
            const day = now.getDate();

            return `Today is ${month} ${day}`;
        },
        'thank': 'No problem! Let me know if you need help with anything else!',
        'list': ` flip a coin, roll a dice, or get today's date. Let me know how I can help!`,
    },


    additionalResponses: {
        'now': `I'm here 😊 What would you like to do? Type "list" to see my abilities.`,

        'help': `I can do a few fun things!
Type "list" to see all available commands.`,

        'who are you': `I'm a simple chatbot 🤖 built to help and have a little fun!`,

        'what can you do': `Try typing "list" and see what I can do!`,

        'thanks': `You're welcome 😊 Happy to help!`,

        'bye': `Goodbye 👋 Have a great day!`,

        'good morning': `Good morning ☀️ Hope you have an awesome day!`,

        'good night': `Good night 🌙 Sleep well!`,

        'your name': `You can call me SimpleBot 🤖`,

        'are you real': `I’m real enough to flip coins and roll dice 😄`,

        'time': `I can’t tell time yet ⏰ but I can tell today’s date! Try "what is the date today".`,
    },


    unsuccessfulResponse: function () {
        const replies = [
            "Hmm… that's impressive 🤔 Unfortunately, I have no idea what that means. Try 'list'.",
            "I would love to help, but my powers are limited 😌 Type 'list' to stay within reality.",
            "Interesting command! Sadly, I don't speak *that* language yet 😏 Try 'list'.",
            "Ah yes… that command exists. Just not for me 🙂 Use 'list' to see what I can do.",
            "I tried very hard to understand that. I failed gracefully 😎 Type 'list'.",
            "That’s a bold request 😄 But I only understand a few commands. Try 'list'.",
            "If I could do that, I would. I really would. But I can’t 😇 Type 'list'."
        ];

        return replies[Math.floor(Math.random() * replies.length)];
    },

    emptyMessageResponse: `Sorry, it looks like your message is empty. Please make sure you send a message and I will give you a response.`,

    addResponses: function (additionalResponses) {
        this.additionalResponses = {
            ...this.additionalResponses,
            ...additionalResponses
        };
    },

    getResponse: function (message) {
        if (!message) {
            return this.emptyMessageResponse;
        }

        // This spread operator (...) combines the 2 objects.
        const responses = {
            ...this.defaultResponses,
            ...this.additionalResponses,
        };

        const {
            ratings,
            bestMatchIndex,
        } = this.stringSimilarity(message, Object.keys(responses));

        const bestResponseRating = ratings[bestMatchIndex].rating;
        if (bestResponseRating <= 0.3) {
            return typeof this.unsuccessfulResponse === 'function'
                ? this.unsuccessfulResponse()
                : this.unsuccessfulResponse;
        }

        const bestResponseKey = ratings[bestMatchIndex].target;
        const response = responses[bestResponseKey];

        if (typeof response === 'function') {
            return response();
        } else {
            return response;
        }
    },

    getResponseAsync: function (message) {
        return new Promise((resolve) => {
            // Pretend it takes some time for the chatbot to response.
            setTimeout(() => {
                resolve(this.getResponse(message));
            }, 1000);
        });
    },

    compareTwoStrings: function (first, second) {
        first = first.replace(/\s+/g, '')
        second = second.replace(/\s+/g, '')

        if (first === second) return 1;
        if (first.length < 2 || second.length < 2) return 0;

        let firstBigrams = new Map();
        for (let i = 0; i < first.length - 1; i++) {
            const bigram = first.substring(i, i + 2);
            const count = firstBigrams.has(bigram)
                ? firstBigrams.get(bigram) + 1
                : 1;

            firstBigrams.set(bigram, count);
        };

        let intersectionSize = 0;
        for (let i = 0; i < second.length - 1; i++) {
            const bigram = second.substring(i, i + 2);
            const count = firstBigrams.has(bigram)
                ? firstBigrams.get(bigram)
                : 0;

            if (count > 0) {
                firstBigrams.set(bigram, count - 1);
                intersectionSize++;
            }
        }

        return (2.0 * intersectionSize) / (first.length + second.length - 2);
    },

    stringSimilarity: function (mainString, targetStrings) {
        const ratings = [];
        let bestMatchIndex = 0;

        for (let i = 0; i < targetStrings.length; i++) {
            const currentTargetString = targetStrings[i];
            const currentRating = this.compareTwoStrings(mainString, currentTargetString)
            ratings.push({ target: currentTargetString, rating: currentRating })
            if (currentRating > ratings[bestMatchIndex].rating) {
                bestMatchIndex = i
            }
        }

        const bestMatch = ratings[bestMatchIndex]

        return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
    },
};

// Define the randomUUID() function if it doesn't exist.
function uuidPolyfill() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
        const randomNumber = Math.random() * 16 | 0;
        const result = char === 'x' ? randomNumber : (randomNumber & 0x3 | 0x8);
        return result.toString(16);
    });
}

// This code allows Chatbot to be used in both the browser and
// in NodeJS. This is called UMD (Universal Module Definition).
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory();
    } else {
        // Create a fallback if window.crypto is undefined.
        if (typeof root.crypto === 'undefined') {
            try {
                root.crypto = {};
            } catch (e) { }
        }

        // Create a fallback crypto.randomUUID() function.
        if (root.crypto && typeof root.crypto.randomUUID !== 'function') {
            try {
                root.crypto.randomUUID = uuidPolyfill;
            } catch (e) { }
        }

        // Browser global
        root.Chatbot = factory();
        root.chatbot = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    return Chatbot;
}));