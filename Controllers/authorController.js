const authorModel = require("../Models/authorModel");
const jwt = require("jsonwebtoken");


function stringVerify(value) {
    if (typeof value !== "string" || value.trim().length == 0) {
        return false
    } else {
        return true
    }
}

//--------------------------createAuthor api---------------------//

const createAuthor = async function (req, res) {

    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ msg: "Please Enter details" });
        }
        let { fname, lname, title, email, password } = data;

        if (!fname) {
            return res.status(400).send({ status: false, msg: "Please provide fname" });
        }
        if (fname) {
            if (!stringVerify(fname)) {
                return res.status(400).send({ status: false, msg: "fname should be type string" });
            }
        }

        if (!lname) {
            return res.status(400).send({ status: false, msg: "Please provide lname" });
        }
        if (lname) {
            if (!stringVerify(lname)) {
                return res.status(400).send({ status: false, msg: "lname should be type string" });
            }
        }

        if (!title) {
            return res.status(400).send({ status: false, msg: "Please provide title" });
        }
        if (title) {
            if (!stringVerify(title)) {
                return res.status(400).send({ status: false, msg: "Title should be string" });
            } if (title != "Mr" && title != "Miss" && title != "Mrs") {
                return res.status(400).send({ status: false, msg: "Please write title like Mr, Mrs, Miss" });
            }
        }

        if (!email) {
            return res.status(400).send({ status: false, msg: "Please provide email" })
        }
        const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        const validEmail = emailFormat.test(email)
        if (!validEmail) {
            return res.status(400).send({ status: false, msg: "Please enter valid Email" });
        }
        let emailinUse = await authorModel.findOne({ email: email })
        if (emailinUse) {
            return res.status(400).send({ status: false, msg: "Please provide another email, provided email is already in use" });
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: "Password is required" });
        }
        const passwordFormat = /^[a-zA-Z0-9@]{6,10}$/
        const validPassword = passwordFormat.test(password)
        if (!validPassword) {
            return res.status(400).send({ status: false, msg: " Please provide password of 6-10 digits with at least one special character, alphabet and number" });
        }

        let authordata = await authorModel.create(data)
        return res.status(201).send({ status: true, data: authordata });
    }
    catch (err) {
       return res.status(500).send({ status: false, error: err.message, });
    }
}


//--------------login api---------------------//

const loginAuthor = async function (req, res) {

    try {
        const Email = req.body.email;
        const Password = req.body.password;

        if (!Email) {
            return res.status(400).send({ status: false, msg: "Please provide email" });
        }

        if (!Password) {
            return res.status(400).send({ status: false, msg: "Please provide password" });
        }

        let author = await authorModel.findOne({ email: Email, password: Password })

        if (!author) {
            return res.status(401).send({ status: false, msg: "Email or Password is not corerct" });
        }

        let token = jwt.sign({ userId: author._id }, "project1-room14-key")

        res.setHeader("x-api-key", token);
        return res.status(200).send({ status: true, token: token });
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message });
    }
}



module.exports = { createAuthor, loginAuthor }