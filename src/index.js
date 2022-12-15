const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", require("./routes"));

const port = process.env.PORT || 8000;
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://tinhpt:67lCUZierLoZZJ0l@cluster0.zad2x.mongodb.net/manment-app"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
  })
  .catch((err) => console.error(err));
