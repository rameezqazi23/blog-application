const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const USER = require("../models/user");
const { setUser } = require("../service/auth");

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body
    await USER.create({
        fullName,
        email,
        password
    })

    return res.redirect("/")
})

router.get("/signin", (req, res) => {
    return res.render("signin")
})

router.get("/signup", (req, res) => {
    return res.render("signup")

})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body

    try {
        const token = await USER.matchPassword(email, password)
        res.cookie("userToken", token)
        return res.redirect("/")

    } catch (error) {
        return res.render("signin", {
            error: "Invalid email or password"
        })

    }

    // console.log("Token data==>", token)

    // const checkUserAuth = await USER.findOne({ email, password })
    // if(!checkUserAuth) return null;

    // const token = setUser(checkUserAuth)
    // res.cookie("uid", token)


})

router.get("/logout", (req, res) => {
    res.clearCookie("userToken").redirect("/")

})

module.exports = router;