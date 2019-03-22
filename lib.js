const axios = require("axios")

exports.getRedditJoke = async function() {
  const response = await axios.get("https://www.reddit.com/r/Jokes/top.json?limit=20")
  const posts = response.data.data.children

  const i = Math.floor(Math.random() * posts.length);
  const randomJoke = posts[i]

  return { 
    title: randomJoke.data.title,
    content: randomJoke.data.selftext
  }
}

