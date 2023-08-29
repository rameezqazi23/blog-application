const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");


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
    // console.log(req.body)
    // console.log(req.file)
    return res.redirect("/")
})

router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("creator")
    const comments = await Comment.find({ blogId: req.params.id }).populate("creator")
    // console.log("Blog Object==>", blog)
    // console.log("USer Object==>", req.user)
    console.log("Comment Object=======>", comments)

    return res.render("blogPage", {
        user: req.user,
        blog,
        comments,
    })
})

router.post("/comment/:blogId", async (req, res) => {
    const comment = await Comment.create({
        content: req.body.content,
        creator: req.user._id,
        blogId: req.params.blogId,
    })
    // console.log("Comment Object==>", comment)

    return res.redirect(`/blog/${req.params.blogId}`)
})





module.exports = router