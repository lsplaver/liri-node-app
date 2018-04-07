require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdb = keys.omdb;

var nodeArgs = process.argv;

console.log(nodeArgs);

var tempTitle = "";

function songAtSpotify(title) {
    spotify.search({
        type: 'track',
        query: title,
        limit: 10
    },
    function(err, data) {
        if (err) {
            return console.log("There was an error: " + err);
        }

        console.log(data);
        for (var y = 0; y < data.tracks.items.length; y++) {
            for (var x = 0; x < data.tracks.items[y].artists.length; x++) {
                console.log("Artist: " + data.tracks.items[y].artists[x].name);
            }
            console.log("Title: " + data.tracks.items[y].name);
            console.log("Preview Link: " + data.tracks.items[y].preview_url);
            console.log("Album: " + data.tracks.items[y].album.name);}
        }
    )
};

function moviesAtOMDB(title) {
    var omdbKey = omdb.key;
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=full&apikey=" + omdbKey;
    console.log(queryUrl);
    request(queryUrl, function(err, response, body) {
        if (!err && response.statusCode === 200) {
            console.log(JSON.parse(body));
            console.log("--------------------");
            console.log("The title of the movie is: " + JSON.parse(body).Title);
            console.log("The movie was made in: " + JSON.parse(body).Year);
            console.log("The IMDB rating is: " + JSON.parse(body).Ratings[0].Value);
            console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movies was produced in: " + JSON.parse(body).Country);
            console.log("The language of the movie is: " + JSON.parse(body).Language);
            console.log("The plot of the movie: \n" + JSON.parse(body).Plot);
            console.log("The actors in the movie are: " + JSON.parse(body).Actors);
        }
    });
};

switch (nodeArgs[2]) {
    case "my-tweets":
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
        break;
    default:
        console.log("You didn't enter a valid option, rerun with the following options: \n'my-tweets' \n'spotify-this-song' followed by the song title in quotes \n'movie-this' followed by the movie title in quotes \n'do-what-it-says'");
        break;
};





// {
//     "tracks": {
//       "href": "https://api.spotify.com/v1/search?query=March+of+Mephisto&type=track&market=US&offset=0&limit=1",
//       "items": [
//         {
//           "album": {
//             "album_type": "album",
//             "artists": [
//               {
//                 "external_urls": {
//                   "spotify": "https://open.spotify.com/artist/7gTbq5nTZGQIUgjEGXQpOS"
//                 },
//                 "href": "https://api.spotify.com/v1/artists/7gTbq5nTZGQIUgjEGXQpOS",
//                 "id": "7gTbq5nTZGQIUgjEGXQpOS",
//                 "name": "Kamelot",
//                 "type": "artist",
//                 "uri": "spotify:artist:7gTbq5nTZGQIUgjEGXQpOS"
//               }
//             ],
//             "available_markets": [
//               "AD",
//               "AR",
//               "AT",
//               "AU",
//               "BE",
//               "BG",
//               "BO",
//               "BR",
//               "CA",
//               "CH",
//               "CL",
//               "CO",
//               "CR",
//               "CY",
//               "CZ",
//               "DE",
//               "DK",
//               "DO",
//               "EC",
//               "EE",
//               "ES",
//               "FI",
//               "FR",
//               "GB",
//               "GR",
//               "GT",
//               "HK",
//               "HN",
//               "HU",
//               "ID",
//               "IE",
//               "IL",
//               "IS",
//               "IT",
//               "JP",
//               "LI",
//               "LT",
//               "LU",
//               "LV",
//               "MC",
//               "MT",
//               "MX",
//               "MY",
//               "NI",
//               "NL",
//               "NO",
//               "NZ",
//               "PA",
//               "PE",
//               "PH",
//               "PL",
//               "PT",
//               "PY",
//               "RO",
//               "SE",
//               "SG",
//               "SK",
//               "SV",
//               "TH",
//               "TR",
//               "TW",
//               "US",
//               "UY",
//               "VN",
//               "ZA"
//             ],
//             "external_urls": {
//               "spotify": "https://open.spotify.com/album/6wQmnnsxRylnJYDKwwxy8r"
//             },
//             "href": "https://api.spotify.com/v1/albums/6wQmnnsxRylnJYDKwwxy8r",
//             "id": "6wQmnnsxRylnJYDKwwxy8r",
//             "images": [
//               {
//                 "height": 640,
//                 "url": "https://i.scdn.co/image/1d53db9f3c26005572f0421e76c568679e75ceec",
//                 "width": 640
//               },
//               {
//                 "height": 300,
//                 "url": "https://i.scdn.co/image/cc8dd3fd047ef64b845635c9cdd92d90bcac11c6",
//                 "width": 300
//               },
//               {
//                 "height": 64,
//                 "url": "https://i.scdn.co/image/7be66daa96ed4ac0f7630848513578acd3e6fa55",
//                 "width": 64
//               }
//             ],
//             "name": "The Black Halo",
//             "release_date": "2005-03-15",
//             "release_date_precision": "day",
//             "type": "album",
//             "uri": "spotify:album:6wQmnnsxRylnJYDKwwxy8r"
//           },
//           "artists": [
//             {
//               "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/7gTbq5nTZGQIUgjEGXQpOS"
//               },
//               "href": "https://api.spotify.com/v1/artists/7gTbq5nTZGQIUgjEGXQpOS",
//               "id": "7gTbq5nTZGQIUgjEGXQpOS",
//               "name": "Kamelot",
//               "type": "artist",
//               "uri": "spotify:artist:7gTbq5nTZGQIUgjEGXQpOS"
//             },
//             {
//               "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/2g2uqZcnWotiAy7hpj5Ui6"
//               },
//               "href": "https://api.spotify.com/v1/artists/2g2uqZcnWotiAy7hpj5Ui6",
//               "id": "2g2uqZcnWotiAy7hpj5Ui6",
//               "name": "Shagrath",
//               "type": "artist",
//               "uri": "spotify:artist:2g2uqZcnWotiAy7hpj5Ui6"
//             }
//           ],
//           "available_markets": [
//             "AD",
//             "AR",
//             "AT",
//             "AU",
//             "BE",
//             "BG",
//             "BO",
//             "BR",
//             "CA",
//             "CH",
//             "CL",
//             "CO",
//             "CR",
//             "CY",
//             "CZ",
//             "DE",
//             "DK",
//             "DO",
//             "EC",
//             "EE",
//             "ES",
//             "FI",
//             "FR",
//             "GB",
//             "GR",
//             "GT",
//             "HK",
//             "HN",
//             "HU",
//             "ID",
//             "IE",
//             "IL",
//             "IS",
//             "IT",
//             "JP",
//             "LI",
//             "LT",
//             "LU",
//             "LV",
//             "MC",
//             "MT",
//             "MX",
//             "MY",
//             "NI",
//             "NL",
//             "NO",
//             "NZ",
//             "PA",
//             "PE",
//             "PH",
//             "PL",
//             "PT",
//             "PY",
//             "RO",
//             "SE",
//             "SG",
//             "SK",
//             "SV",
//             "TH",
//             "TR",
//             "TW",
//             "US",
//             "UY",
//             "VN",
//             "ZA"
//           ],
//           "disc_number": 1,
//           "duration_ms": 328973,
//           "explicit": false,
//           "external_ids": {
//             "isrc": "QM3MF1600001"
//           },
//           "external_urls": {
//             "spotify": "https://open.spotify.com/track/7m7LZGSKYcpB7nvG6FbVbM"
//           },
//           "href": "https://api.spotify.com/v1/tracks/7m7LZGSKYcpB7nvG6FbVbM",
//           "id": "7m7LZGSKYcpB7nvG6FbVbM",
//           "name": "March of Mephisto (feat. Shagrath)",
//           "popularity": 50,
//           "preview_url": "https://p.scdn.co/mp3-preview/8f2a50ae093d365b35aefe0805ff08f3b561b14f?cid=774b29d4f13844c495f206cafdad9c86",
//           "track_number": 1,
//           "type": "track",
//           "uri": "spotify:track:7m7LZGSKYcpB7nvG6FbVbM"
//         }
//       ],
//       "limit": 1,
//       "next": "https://api.spotify.com/v1/search?query=March+of+Mephisto&type=track&market=US&offset=1&limit=1",
//       "offset": 0,
//       "previous": null,
//       "total": 8
//     }
//   }