const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = 8080;
const path = require("path");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res, next) => {
  res.send("hello");
});

const startListening = () => {
  app.listen(process.env.PORT || 8080, () =>
    console.log(`Mixing it up on port ${PORT}`)
  );
};

startListening();
