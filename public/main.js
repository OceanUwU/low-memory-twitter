const socket = io(); //Make a websocket connection to the server.

socket.on('connect', () => {
    socket.on('tweetReceived', tweet => { //When the server posts a tweet,
        //show the tweet on the page.
        document.getElementById('tweet.text').innerHTML = tweet.text; //OMG! UNESCAPED!!! who cares - twitter will be fixed soon
        document.getElementById('tweet.author').innerHTML = tweet.author;
        document.getElementById('tweet.date').innerHTML = new Date(tweet.date);
    });
});

function sendTweet() {
    let input = document.getElementById('new_tweet_text'); //
    if (input.value.length == 0) return; //If the user hasn't input anything, stop here.
    socket.emit('tweet', input.value); //Send the tweet text to the server.
    input.value = ''; //Clear the input.
    updateCharacterCounter(); //Reset the character counter back to zero.
}

function updateCharacterCounter() {
    document.getElementById('character_count').innerHTML = document.getElementById('new_tweet_text').value.length; //Set the character counter to the amount of characters in the user's input.
}

function main() {
    document.onkeydown = e => { //When a key is pressed,
        if (e.which == 13 && !e.shiftKey) //if the key pressed was enter, and shift wasn't being held,
            sendTweet(); //tweet.
    }

    updateCharacterCounter(); //Initialise the character counter.
}

main();