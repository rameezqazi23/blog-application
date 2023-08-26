const { Schema, model, default: mongoose } = require("mongoose");
const { createHmac, randomBytes } = require('crypto');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    salt: {
        type: String,
        unique: true,

    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: '../public/images/avatar.png'
    },
    role: {
        enum: ["USER", "ADMIN"],
        default: "USER"
    },


}, { timestamps: true })

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return

    const salt = randomBytes(16).toString(); //this actually secret key
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex')

    this.salt = salt;
    this.password = hashedPassword;


})

const USER = mongoose.model("users", userSchema);

module.exports = USER