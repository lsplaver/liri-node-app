# liri-node-app

This app searches several websites for keyword info and returns it using node in the command line and to a log.txt file.

It searches Spotify for the song title entered and returns 10 most relevant results for the user.

It searches Twitter for keywords and returns the 20 most recent tweets.

It searches OMDB for a movie using the title entered and returns information about the movie.

To start the app run node liri-node-app.js in the console with the following commands:
    my-tweets <parameters>
    spotify-this-song <song-title>
    movie-this <movie-title>
    do-what-it-says

Node modules used:
    request
    twitter
    node-spotify-api
    dotenv

OMDB API