const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const { connectToMongoDb } = require("./connect");


const app = express();
const PORT = 5000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

//Routes
app.get("/", (req, res) => {
    return res.render("home")
})

app.use("/user", userRoute)




connectToMongoDb("mongodb://127.0.0.1:27017/blog-app")
    .then(() => console.log("MongoDb successfully connected!"))
    .catch((err) => console.log("MongoDb connection error ", err))


app.listen(PORT, () => console.log("Server running on PORT: ", PORT))