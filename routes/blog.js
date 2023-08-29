const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const Blog = require("../models/blog");

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.body
    })
})



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve("./public/uploads"))
    },

    filename: function (req, file, cb) {
        const fileName = ` ${Date.now()}-${file.originalname}`
        return cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

router.post("/", upload.single("coverImageUrl"), async (req, res) => {
    const { title, body } = req.body
    const blog = await Blog.create({
        title,
        body,
        coverImageUrl: `/uploads/${req.file.filename}`,
        creator: req.user._id

    })
    console.log(req.body)
    console.log(req.file)
    return res.redirect("/")
})



module.exports = router