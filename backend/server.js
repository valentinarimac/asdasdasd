const express = require("express");
const connectDB = require("./config/db");
const params = require("./params");
const port = 5000;
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api/lists/", require("./routes/listRoutes"));
app.use("/api/tasks/", require("./routes/taskRoutes"));
app.use("/api/users/", require("./routes/userRoutes"));

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
);
app.get("/", (req, res) => res.send("Please set to production"));

app.listen(port, () => console.log(`Server started on port ${port}`));
