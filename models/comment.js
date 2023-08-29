const { Schema, model, default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,

    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blog",
    },
}, { timestamps: true })

const Comment = mongoose.model("comment", commentSchema)

module.exports = Comment