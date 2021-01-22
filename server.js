const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Todo = require("./models/Todo");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tododb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API ROUTES

app.get("/api/todos", (req, res) => {
  Todo.find({}).then((dbTodo) => res.json(dbTodo));
});

app.post("/api/todos", (req, res) => {
  Todo.create(req.body).then((dbTodo) => res.json(dbTodo));
});

// END API ROUTES

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
  });
}

app.listen(PORT, () => console.log(`App listening on PORT:${PORT}`));
