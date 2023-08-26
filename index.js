const express = require("express");
const path = require("path")
const app = express();
const PORT = 5000;

//Middleware
app.use(express.json());


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

//Routes
app.get("/", (req, res) => {
    return res.render("home")
})


app.listen(PORT, () => console.log("Server running on PORT: ", PORT))