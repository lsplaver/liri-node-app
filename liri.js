require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function logInfo(loggedData) {

    fs.appendFile('./log.txt', "\n" + loggedData, function (err) {
        if (err) {
            console.log("The append attempt failed with this error: " + err);
        }
    }
    )
};

var nodeArgs = process.argv;

console.log(nodeArgs);
for (var x = 0; x < 3; x++) {
    logInfo(nodeArgs[x]);
}

var tempTitle = "";

function songAtSpotify(title) {
    logInfo(title);
    spotify.search({
        type: 'track',
        query: title,
        limit: 10
    },
        function (err, data) {
            if (err) {
                return console.log("There was an error: " + err);
            }

            // console.log(data);
            for (var y = 0; y < data.tracks.items.length; y++) {
                for (var x = 0; x < data.tracks.items[y].artists.length; x++) {
                    console.log("Artist: " + data.tracks.items[y].artists[x].name);
                    logInfo("Artist: " + data.tracks.items[y].artists[x].name);
                }
                console.log("Title: " + data.tracks.items[y].name);
                logInfo("Title: " + data.tracks.items[y].name);
                console.log("Preview Link: " + data.tracks.items[y].preview_url);
                logInfo("Preview Link: " + data.tracks.items[y].preview_url);
                console.log("Album: " + data.tracks.items[y].album.name);
                logInfo("Album: " + data.tracks.items[y].album.name);
            }
        }
    )
    logInfo("---------------------------------------------------");
};

function moviesAtOMDB(title) {
    logInfo(title);
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=full&apikey=trilogy";
    console.log(queryUrl);
    logInfo(queryUrl);
    request(queryUrl, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            console.log("The title of the movie is: " + JSON.parse(body).Title);
            logInfo("The title of the movie is: " + JSON.parse(body).Title);
            console.log("The movie was made in: " + JSON.parse(body).Year);
            logInfo("The movie was made in: " + JSON.parse(body).Year);
            console.log("The IMDB rating is: " + JSON.parse(body).Ratings[0].Value);
            logInfo("The IMDB rating is: " + JSON.parse(body).Ratings[0].Value);
            console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
            logInfo("The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movies was produced in: " + JSON.parse(body).Country);
            logInfo("The movies was produced in: " + JSON.parse(body).Country);
            console.log("The language of the movie is: " + JSON.parse(body).Language);
            logInfo("The language of the movie is: " + JSON.parse(body).Language);
            console.log("The plot of the movie: \n" + JSON.parse(body).Plot);
            logInfo("The plot of the movie: \n" + JSON.parse(body).Plot);
            console.log("The actors in the movie are: " + JSON.parse(body).Actors);
            logInfo("The actors in the movie are: " + JSON.parse(body).Actors);
        }
    });
    logInfo("---------------------------------------------------");
};

var chosenComnd = nodeArgs[2];

function liriCommandSwitch(chosenCommand) {
    switch (chosenCommand) {
        case "my-tweets":
            if (nodeArgs.length === 4) {
                tweetsAtTwitter(nodeArgs[3]);
            }
            else if (nodeArgs.length > 4) {
                tempTitle = nodeArgs[3];
                for (var b = 4; b < nodeArgs.length; b++) {
                    tempTitle = tempTitle + " " + nodeArgs[b];
                }
                tweetsAtTwitter(tempTitle);
            }
            else {
                tweetsAtTwitter("node.js");
            }
            break;
        case "spotify-this-song":
            if (nodeArgs.length === 4) {
                songAtSpotify(nodeArgs[3]);
            }
            else if (nodeArgs.length > 4) {
                tempTitle = nodeArgs[3];
                for (var z = 4; z < nodeArgs.length; z++) {
                    tempTitle = tempTitle + " " + nodeArgs[z];
                }
                songAtSpotify(tempTitle);
            }
            else {
                songAtSpotify("The Sign");
            }
            break;
        case "movie-this":
            if (nodeArgs.length === 4) {
                moviesAtOMDB(nodeArgs[3]);
            }
            else if (nodeArgs.length > 4) {
                tempTitle = nodeArgs[3];
                for (var z = 4; z < nodeArgs.length; z++) {
                    tempTitle = tempTitle + "+" + nodeArgs[z];
                }
                moviesAtOMDB(tempTitle);
            }
            else {
                moviesAtOMDB("Mr.+Nobody");
            }
            break;
        case "do-what-it-says":
            fs.readFile('random.txt', 'utf8', function (err, data) {
                if (err) {
                    logInfo("Error occurred: " + err);
                    return console.log("Error occurred: " + err);
                }
                console.log(data);
                logInfo(data);
                var tempRandom = [];
                tempRandom = data.split(',');
                for (var a = 0; a < tempRandom.length; a++) {
                    console.log("The value of tempRandom[" + a + "] is: " + tempRandom[a]);
                    logInfo("The value of tempRandom[" + a + "] is: " + tempRandom[a]);
                }
                randomCommand = tempRandom[0];
                nodeArgs[3] = tempRandom[1];
                resetSwitch(randomCommand);
            });
            break;
        default:
            var tempString = "You didn't enter a valid option, rerun with the following options: \n'my-tweets' \n'spotify-this-song' followed by the song title in quotes \n'movie-this' followed by the movie title in quotes \n'do-what-it-says'";
            console.log(tempString);
            logInfo(tempString);
            logInfo("---------------------------------------------------");
            break;
        };
};

liriCommandSwitch(chosenComnd);

function resetSwitch(newCommand) {
    logInfo("The new command: " + newCommand);
    liriCommandSwitch(newCommand);
};

function tweetsAtTwitter(theTweets) {
    tempTweets = theTweets + " filter:safe";
    logInfo(tempTweets);
    client.get('search/tweets', {
        q: tempTweets,
        lang: 'en',
        since_id: 20
    }, function (error, tweets, response) {
        console.log(tweets);
        logInfo(JSON.stringify(tweets).toString());
        logInfo("---------------------------------------------------");
    });
};