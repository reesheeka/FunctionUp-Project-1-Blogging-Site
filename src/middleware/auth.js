const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");
const mongoose = require("mongoose");


//---------------------authentication--------------------//

const authenticate = function (req, res, next) {

    try {

        let token = req.headers["x-api-key"]

        if (!token) {
            return res.status(401).send({ status: false, msg: "Token must be present" });
        }

        let decodedToken = jwt.verify(token, "project1-room14-key")

        req.decodedToken = decodedToken.userId
        
        next()

    } catch (err) {
        res.status(401).send({ status: false, msg: "Invalid Token" });
    }
}


//-----------------------authorisation------------------------//

const authorise = async function (req, res, next) {

    try {
     
        let blogId = req.params.blogId

        const blog = await blogModel.findById(blogId)

        if (blogId) {
            if (!mongoose.Types.ObjectId.isValid(blogId)) {
                return res.status(400).send({ status: false, msg: "!Oops blogId is not valid" })
            }
        }

        if (!blog) {
            return res.status(404).send({ status: false, msg: "Blog is not found" });
        }

        let decodedToken = req.decodedToken
        let authorId = blog.authorId

        if (decodedToken == authorId) {
            next()
        } else {
            return res.status(403).send({ status: false, msg: "Unauthorized  user, info doesn't match" });
        }

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}



module.exports = { authenticate, authorise }