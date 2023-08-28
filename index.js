const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { connectToMongoDb } = require("./connect");
const { checkAuthenticationCookie } = require("./middlewares/auth");


const app = express();
const PORT = 5000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(checkAuthenticationCookie("userToken"))


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

//Routes
app.get("/", (req, res) => {
    console.log("User Object==>", req.user)

    return res.render("home", {
        user: req.user,
    })
})


//Routes---
app.use("/user", userRoute)
app.use("/blog", blogRoute)



connectToMongoDb("mongodb://127.0.0.1:27017/blog-app")
    .then(() => console.log("MongoDb successfully connected!"))
    .catch((err) => console.log("MongoDb connection error ", err))


app.listen(PORT, () => console.log("Server running on PORT: ", PORT))