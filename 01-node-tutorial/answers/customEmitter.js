const EventEmitter = require("events");

console.log("Kids Chat Room");

const chatBotEmitter = new EventEmitter();
const chatKidEmitter = new EventEmitter();

chatBotEmitter.on("kidJoins", (kidName, age) => {
    console.log(` ${kidName} (age ${age}) joined the chat`);
    setTimeout(() => {
        chatKidEmitter.emit("message", "ChatBot", `Welcome ${kidName}! Say hi to everyone! `);
    }, 500);
});

chatKidEmitter.on("message", (sender, message) => {
    console.log(`- ${sender}: ${message}`);
});

setTimeout(() => {
    chatBotEmitter.emit("kidJoins", "Emma", 8);
}, 1000);

setTimeout(() => {
    chatBotEmitter.emit("kidJoins", "Jake", 7);
}, 2000);

setTimeout(() => {
    chatKidEmitter.emit("message", "Emma", "Hello everyone! ");
}, 3000);

setTimeout(() => {
    chatKidEmitter.emit("message", "Jake", "hi");
}, 5000);