const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const db = require("./config/database");
const exphbs = require("express-handlebars");

// ejs
app.set("view engine", "ejs");

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));
// Index route
app.get("/", (req, res) => {
  res.render("landing");
});

app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log("running on port 5000");

  // Test the connection
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
