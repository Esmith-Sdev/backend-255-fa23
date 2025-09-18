const express = require("express")
var cors = require("cors")
//Tells app variable to be an express server
const app = express()
app.use(cors())
const router = express.Router()

//Making an api using routes
//Routes are used to handle browser requests. They look like URL's but the difference is when a browser requests a route, it is dynamically handled using a function

router.get("/songs", function(req,res) {
    const songs = [
    {
        title: "Uptown Funk",
        artist: "Bruno Mars",
        popularity: 10,
        genre: ["funk","boogie"]
    },
    {
        title: "Happy",
        artist: "Pharrell Williams",
        popularity: 10,
        genre: ["Soul","Funk"]
    }
    ]   
    res.json(songs)
})

//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
app.use("/api", router)
app.listen(3000)