require("dotenv").config();
const express = require("express");
var cors = require("cors");
require("./db");
const bodyParser = require("body-parser");
const jwt = require("jwt-simple");
const Song = require("./models/song");
const User = require("./models/users");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const router = express.Router();
const secret = "supersecret";

//creating a new user
router.post("/user", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ error: "Missing username or password" });
  }
  const newUser = await new User({
    username: req.body.username,
    password: req.body.password,
    status: req.body.status,
  });
  try {
    await newUser.save();
    res.sendStatus(201);
    console.log(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//authenticate or login
//post request - resason why is because when you login you are creating what we call a new "session"
router.post("/auth", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ error: "Missing username or password" });
    return;
  }
  //try to find the username in the database, then see if it matches with a username and password
  //await finding a user
  let user = await User.findOne({ username: req.body.username });
  //connection or server error
  if (!user) {
    res.status(400).send(err);
    //if they cannot find the user
  } else if (!user) {
    res.status(401).json({ error: "Bad username" });
  }
  //check to see if the users password matches the requests password
  else {
    if (user.password != req.body.password) {
      res.status(401).json({ error: "Bad password" });
    } else {
      //create a token that is encoded with the jwt library, and send back the username..this is important for later
      //we also will send back as part of the token that you are currrently authorized
      //we could do this with a boolean or number value i.e. if auth = 0 not authorized if auth = 1 youre authorized

      username2 = user.username;
      const token = jwt.encode({ username: user.username }, secret);
      const auth = 1;

      //respond with the token
      res.json({
        username2,
        token: token,
        auth: auth,
      });
    }
  }
});
//check status of user with a valid token, see if it matches the front end token
router.get("/status", async (req, res) => {
  if (!req.headers["x-auth"]) {
    return res.status(401).json({ error: "Missing x-Auth" });
  }
  //if x-auth contains the token (it should)
  const token = req.headers["x-auth"];
  try {
    const decoded = jwt.decode(token, secret);

    let users = User.find({}, "username status");
    res.json(users);
  } catch (ex) {
    res.status(401).json({ error: "invalid jwt" });
  }
});

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
router.delete("/songs/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    console.log(song);
    await Song.deleteOne({ _id: song._id });
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err);
  }
});
//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
app.use("/api", router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on " + PORT));
