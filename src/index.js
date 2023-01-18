const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
var key = fs.readFileSync(__dirname + "/../certs/selfsigned.key");
var cert = fs.readFileSync(__dirname + "/../certs/selfsigned.crt");
var options = {
  key: key,
  cert: cert,
};
app.use("/api", require("./routes"));

const port = process.env.PORT || 8000;

const httpsServer = https.createServer(options, app);
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://tinhpt:67lCUZierLoZZJ0l@cluster0.zad2x.mongodb.net/manment-app"
  )
  .then(() => {
    httpsServer.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
  })
  .catch((err) => console.error(err));
