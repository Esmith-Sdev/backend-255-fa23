const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sdev255:Sdev2025@SongDB.1iwbe5a.mongodb.net/?retryWrites=true&w=majority&appName=SongDB",
  { useNewUrlParser: true }
);

module.exports = mongoose;
