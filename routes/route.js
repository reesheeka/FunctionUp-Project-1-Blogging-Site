<<<<<<< HEAD
const authorController = require("../Controllers/authorController");
const blogController = require("../Controllers/blogController");
const MW = require("../Middlewares/auth");
const express = require("express")
const router = express.Router();





router.post('/createAuthor', authorController.createAuthor);

router.post('/createBlog', MW.authenticate, blogController.createBlog);

router.get('/getBlog', MW.authenticate, blogController.getBlog);

router.put("/blogs/:blogId", MW.authenticate, MW.authorise, blogController.updateBlog);

router.delete("/blogs/:blogId", MW.authenticate, MW.authorise, blogController.deleteBlogByPathParam);

router.delete("/blogs",MW.authenticate, blogController.deleteByQuery);

router.post("/loginAuthor", authorController.loginAuthor);



router.all("/*", function (req, res) {
    try{
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
}catch(err){res.send(err.message)}
})







=======
const AuthorController= require("../controllers/authorController")
const BlogController= require("../controllers/blogController")

const router = express.Router();

router.post('/createAuthor', AuthorController.createAuthor)

router.post('/createBlog', BlogController.createBlog)

router.get('/getBlog', BlogController.getBlog)
>>>>>>> 71979613dbfcf9c9eedc82f2718a431fe0304ff5



module.exports = router;