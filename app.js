const express = require("express");
var cors = require("cors");
require("./db");
const bodyParser = require("body-parser");
const Song = require("./models/song");
const app = express();
app.use(cors());

app.use(bodyParser.json());
const router = express.Router();

//grab all songs in a database
router.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find({});
    res.send(songs);
    console.log(songs);
  } catch (err) {
    console.log(err);
  }
});
//grab a single song
router.get("/songs/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    res.json(song);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/songs", async (req, res) => {
  try {
    const song = await new Song(req.body);
    await song.save();
    res.status(201).json(song);
    console.log(song);
  } catch (err) {
    res.status(400).send(err);
  }
});

//update an existing record/resource/DB entry//it uses a put request

router.put("/songs/:id", async (req, res) => {
  try {
    const song = req.body;
    await Song.updateOne({ _id: req.params.id }, song);
    console.log(song);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err);
  }
});

//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
app.use("/api", router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on " + PORT));
