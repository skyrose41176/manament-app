const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes"));

const port = process.env.PORT || 8080;
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://ngoctien:9ixQIABOvaaTfEHo@cluster0.xhlbk.mongodb.net/manament"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
  })
  .catch((err) => console.error(err));
