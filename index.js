class Tweet {
    constructor (text) {
        this.text = text;
        this.author = require('node-random-name')(); //Generate a random name for the author.
        this.date = Date.now(); //Save the time of the tweet.
        console.log(`${this.author} tweeted: ${this.text}`); //Log the tweet.
    }
};

var tweet = new Tweet('h'); //Create a global tweet variable to store the current tweet, and create a new tweet as a placeholder until someone tweets.

const io = require('socket.io').listen( //Start a socket.io server which listens on...
    require('express')() //...an express server, which...
    .use(require('express').static('./public')) //...serves files from the public directory...
    .listen(require('./port')) //...and listens on the port configured in the port file.
);

io.on('connect', socket => { //When a client connects:
    socket.emit('tweetReceived', tweet); //Tell the connected client what the current tweet is.

    socket.on('tweet', tweetText => { //When a client sends a tweet:
        if (typeof tweetText != 'string' || tweetText.length > 280) return; //Reject the tweet if it's the wrong type or too long.
        tweet = new Tweet(tweetText); //Set the current tweet to the newly created tweet.
        io.emit('tweetReceived', tweet); //Tell all other connected clients that the tweet has changed.
    });
});
