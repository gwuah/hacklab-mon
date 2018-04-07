// require all dependencies
const Twit = require("twit");

// auth tokens/keys
const keys = {
	consumer_key : "" ,
	consumer_secret : "",
	access_token : "",
	access_token_secret : "" ,
};

// setup instance
const Twttr = new Twit(keys);


// create a finer wrapper around native Twit code
const Twitter = {
	tweet: (tweet) => {
    return new Promise((res, rej)=> {
      Twttr.post('statuses/update', {
        status: tweet
      }, (error, response) => {
        error ? rej(error) : res(response)
      });
    });
  },

  retweet: (tweet) => {
    return new Promise((res, rej)=> {
      Twttr.post('statuses/retweet/:id', { 
        id: tweet.id_str
      }, (error, response) => {
        error ? rej(error) : res(response)
      });
    });
  },

  like: (tweet) => {
    return new Promise((res, rej)=> {
      Twttr.post('favorites/create', { 
        id: tweet.id_str
      }, (error, response) => {
        error ? rej(error) : res(response)
      });
    });
  },

  stream: (path, payload) => {
  	return Twttr.stream(path, payload)
  },

  stringify: data => JSON.stringify(data),

  parse: data => JSON.parse(data),

  simulate: function(timeout, actionType, data) {
  	setTimeout(() => {
  		// Twitter["retweet"](data)
  		this[actionType](data)
  			// .then( // there's no further handling for now)
  			.catch(err => {
  				if (err.message == 'You have already retweeted this Tweet.' && err.code ==327) {
  					console.log("You have already retweeted that tweet");
  				}
  			})
  	}, timeout, data);
  }

}

// expose interface to index.js
module.exports = Twitter;
console.log("Hello World");
