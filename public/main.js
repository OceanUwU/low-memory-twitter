const socket = io(); //Make a websocket connection to the server.

socket.on('connect', () => {
    socket.on('tweetReceived', tweet => { //When the server posts a tweet,
        //show the tweet on the page.
        $('#tweet_text').html(tweet.text);
        updatEscape();
        $('#tweet_author').html(tweet.author);
        $('#tweet_date').html(new Date(tweet.date));
    });
});

function sendTweet() {
    let input = $('#new_tweet_text').val();
    if (input.length == 0) return; //If the user hasn't input anything, stop here.
    socket.emit('tweet', input); //Send the tweet text to the server.
    $('#new_tweet_text').val(''); //Clear the input.
    updateCharacterCounter(); //Reset the character counter back to zero.
}

function updateCharacterCounter() {
    $('#character_count').html($('#new_tweet_text').val().length); //Set the character counter to the amount of characters in the user's input.
}

function updatEscape() {
    if ($('#escape_tweet').prop('checked')) { //If the user wants html to be escaped,
        $('#tweet_text').html( //set the tweet's text to...
            $('<div>').text($('#tweet_text').html()).html() //...its own text, but html escaped.
        );
    } else { //If the user doesn't want html to be escaped,
        $('#tweet_text').html( //set the tweet's text to...
            $('<div>').html($('#tweet_text').html()).text() //...its own text, but html unescaped.
        );
    }
}

function main() {
    document.onkeydown = e => { //When a key is pressed,
        if (e.which == 13 && !e.shiftKey) //if the key pressed was enter, and shift wasn't being held,
            sendTweet(); //tweet.
    }

    updateCharacterCounter(); //Initialise the character counter.
}

main();