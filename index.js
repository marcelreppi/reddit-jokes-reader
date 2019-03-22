const Alexa = require("alexa-sdk");

const { getRedditJoke } =  require("./lib.js")

const handlers = {
	"LaunchRequest": function () {
		this.emit("GetJokeIntent");
	},
	"GetJokeIntent": async function () {
		const { title, content } = await getRedditJoke()
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