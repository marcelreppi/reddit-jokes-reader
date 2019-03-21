const Alexa = require("alexa-sdk");
const axios = require("axios")

const handlers = {
	"LaunchRequest": function () {
		this.emit("GetJokeIntent");
	},
	"GetJokeIntent": async function () {
		const response = await axios.get("https://www.reddit.com/r/Jokes/top.json?limit=20")
		const posts = response.data.data.children

		const i = Math.floor(Math.random() * posts.length);
		const randomJoke = posts[i]

		const { title, selftext:content } = randomJoke.data

		this.emit(":tell", `${title} <break time="1s"/> ${content}`);
	},
	"AMAZON.HelpIntent": function () {
		this.emit(":ask", "Just say open reddit jokes");
	},
	"AMAZON.CancelIntent": function () {
		this.emit(":tell", "Bye!");
	},
	"AMAZON.StopIntent": function () {
		this.emit(":tell", "Bye!");
	},
};

exports.handler = function (event, context) {
	const alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
};