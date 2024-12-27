const user = require("../models/userSchema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.indexPage = (req, res) => {

    return res.render('index')
}

module.exports.signupPage = (req, res) => {
    return res.render('./pages/signup')
}

module.exports.loginPage = (req, res) => {
    return res.render('./pages/login')
}
module.exports.signup = async (req, res) => {
    try {
        let { username, email, password, phone } = req.body;
        let userdata = await user.findOne({ email });
        if (userdata) return res.status(400).send("User already registered.");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await user.create({
            username,
            email,
            password: hashedPassword,
            phone,
        });


        return res.redirect("/login");
    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).send("Internal Server Error.");
    }
};

module.exports.createLoginPage = async (req, res) => {
    try {
        let { username, password } = req.body;
        let userdata = await user.findOne({ username });
        if (!userdata) return res.status(400).redirect("/login");

        const isPasswordValid = await bcrypt.compare(password, userdata.password);

        if (!isPasswordValid) return res.status(401).redirect("/login");

        let token = jwt.sign({ username: username, userid: userdata._id }, "kiran", {
            expiresIn: "1h", // Token expiration
        });
        res.cookie("token", token, { httpOnly: true });
        return res.status(200).redirect("/");
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).send("Internal Server Error.");
    }
};


module.exports.logoutPage = async(req,res)=>{
    res.clearCookie('token')
    return res.redirect('/login')
}