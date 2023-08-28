const express = require("express");
const multer = require("multer");
const router = express.Router();

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.body
    })
})



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "../public/uploads")
    },

    filename: function (req, file, cb) {
        const fileName = Date.now() + file.originalname
        return cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

router.post("/", upload.single("uploaded_file"), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    return res.redirect("/")
})



module.exports = router