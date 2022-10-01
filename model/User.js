const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({

    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, trim: true },
    pwd: { type: String, required: true, trim: true },
    mobile: { type: Number, required: true, trim: true },

}, {
    timestamps: true,
});

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("pwd")) {
        user.pwd = await bcrypt.hash(user.pwd, 9);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.statics.login = async (email, pwd) => {
    const user = await User.findOne({ email });
    if (!user) {
        return false
    }
    const isPasswordMatch = await bcrypt.compare(pwd, user.pwd);
    if (!isPasswordMatch) {
        return false
    }
    return user;
};


module.exports = mongoose.model('User', userSchema);






