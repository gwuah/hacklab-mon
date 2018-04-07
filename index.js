// load dependencies
const express = require('express');
const path = require('path');
const Twitter = require("./twitter");
const mongoose = require("mongoose");

// env variables 
const db_uri = "mongodb://gwuah:gwuah2018@ds145415.mlab.com:45415/hacklab-mon-db";
const port = 5005;

// configurations
const app = express();
app.use(express.static(path.join(__dirname, "public")));

mongoose.Promise = global.Promise;
mongoose.connect(db_uri);

// listen for possible db errors
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// initialise bs
app.set('port', port);

// for some reason it wasnt working, had to use express.static

// app.get("/", (req, res) => {
// 	console.log(" GET/ ")
// 	res.sendFile(path.join(__dirname, 'public/index.html'))
// });

app.listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});

// setup db stuff
const TWEET = mongoose.model('Tweet', { tweet: String });


// open a stream and track a keyword
const stream = Twitter.stream('statuses/filter', { track: '#hacklab2018' })

// handle events as they drop
stream.on("tweet", (tweet) => {
	console.log(typeof tweet);
	// it's an object

	const Twit = new TWEET({
		tweet: JSON.stringify(tweet)
	});

	Twit
		.save()
		.then(() => console.log("tweet saved sucessfully"))

	console.log(tweet.text)

})
