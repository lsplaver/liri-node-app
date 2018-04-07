require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var nodeArgs = process.argv;

switch (nodeArgs) {
    case "my-tweets":
        break;
    case "spotify-this-song":
        break;
    case "movie-this":
        break;
    case "do-what-it-says":
        break;
    default:
        console.log("You didn't enter a valid option, rerun with the following options: \n'my-tweets' \n'spotify-this-song' followed by the song title \n'movie-this' followed by the movie title \n'do-what-it-says'");
        break;
};

