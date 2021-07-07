const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");
const { urlencoded, json } = require("body-parser");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const resultSchema = new mongoose.Schema({
  data: String,
  calories: String,
});

const Result = mongoose.model("result", resultSchema);

// module.exports = Result;

app.use(morgan("dev"));
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/addItem", async (req, res) => {
  const result = await Result.find({}).lean().exec();
  res.status(200).json(result);
  console.log("we are getting get???");
});

app.post("/addItem", async (req, res) => {
  const { calories, data } = req.body;

  const newItem = new Result({ calories, data });
  newItem.save();
  Result.create({ calories, data })
    .then((data) => console.log("saved!", data))
    .catch((err) => console.error("bunch of errors: ", err));
  res.status(201).send();
});

app.listen(5000, () => {
  console.log("server up on http://localhost:5000");
});
