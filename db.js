const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, {})
  .then(() => console.log("Mongo connected"))
  .catch((err) => {
    console.error("Mongo error", err);
    process.exit(1);
  });

module.exports = mongoose;
