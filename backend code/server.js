require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db.config");
const artistRoutes = require("./routes/artist.routes");
const genreRoutes = require("./routes/genre.routes");
const movieRoutes = require("./routes/movie.routes");
const userRoutes = require("./routes/user.routes");


// cors is implemented to * as every one can access
app.use(cors({ origin: "*" }));

// bodyParser is used so that frontend data can be accssed in the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route handlers for both with api and without api
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Upgrad Movie booking application development." });
});
app.get("/api/", (req, res) => {
    res.json({ message: "Welcome to Upgrad Movie booking application development." });
});

app.use("/artists", artistRoutes);
app.use("/api/artists", artistRoutes);

app.use("/genres", genreRoutes);
app.use("/api/genres", genreRoutes);

app.use("/movies", movieRoutes);
app.use("/api/movies", movieRoutes);

app.use("/auth/", userRoutes);
app.use("/api/auth/", userRoutes);

// app.get('/movies', (req, res) => {
//     res.send('All Movies Data in JSON format from Mongo DB');
// });

// app.get('/genres', (req, res) => {
//     res.send('All Genres Data in JSON format from Mongo DB');
// });

// app.get('/artists', (req, res) => {
//     res.send('All Artists Data in JSON format from Mongo DB');
// });


//
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");

    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}! http://localhost:${PORT}/api`);
});