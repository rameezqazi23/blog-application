const { Schema, model, default: mongoose } = require("mongoose");


const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    body: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: false,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    cretedAt: {
        type: Date,
        default: new Date(),
    }
}, { timestamps: true });


const Blog = mongoose.model("blog", blogSchema)

module.exports = Blog