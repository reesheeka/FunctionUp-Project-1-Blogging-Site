const blogModel = require("../Models/blogModel");
const authorModel = require("../Models/authorModel");
const mongoose = require("mongoose");

function stringVerify(value) {
  if (typeof value !== "string" || value.trim().length == 0) {
    return false
  } else {
    return true
  }
}


//--------------------------createBlog api--------------------------//

const createBlog = async function (req, res) {
  try {
    let data = req.body
    let { title, body, authorId, tags, category, subcategory } = data

    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, msg: "Please provide all the required data" });
    }

    if (!title) {
      return res.status(400).send({ status: false, msg: "Please provide title" });
    }

    if (!body) {
      return res.status(400).send({ status: false, msg: "Please provide body" });
    }

    if (!authorId) {
      return res.status(400).send({ status: false, msg: "Please provide authorId" });
    }
    if (authorId) {
      if (!mongoose.isValidObjectId(authorId)) {
        return res.status(400).send({ status: false, msg: "!Oops authorId is not valid" })
      }
    }

    if (!category) {
      return res.status(400).send({ status: false, msg: "Please provide category" });
    }

    if (!stringVerify(title)) {
      return res.status(400).send({ status: false, msg: "Title should be type String" });
    }

    if (!stringVerify(body)) {
      return res.status(400).send({ status: false, msg: "Body should be type String" });
    }

    if (!stringVerify(authorId)) {
      return res.status(400).send({ status: false, msg: "AuthorId should be type String" });
    }

    if (!stringVerify(category)) {
      return res.status(400).send({ status: false, msg: "Category should be type String" });
    }

    let authId = await authorModel.findById(data.authorId)

    if (!authId) {
      return res.status(400).send({ status: false, msg: "AuthorId is not Present" });
    }

    let blogData = await blogModel.create(data)
    return res.status(201).send({ status: true, data: blogData });

  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }

}


//----------------------------getBlog api-------------------------------//

const getBlog = async function (req, res) {
  try {
    let allblog = req.query
    let { authorId, category, tags, subcategory } = allblog

    if (Object.keys(allblog).length == 0) {
      return res.status(400).send({ status: false, msg: "Please Enter details" });
    }

    if (category) {
      if (!stringVerify(category)) {
        return res.status(400).send({ msg: "Category should be type String" });
      }
    }

    if (tags) {
      if (!stringVerify(tags)) {
        return res.status(400).send({ status: false, msg: "Tags should be in String only" });
      }
    }

    if (subcategory) {
      if (!stringVerify(subcategory)) {
        return res.status(400).send({ status: false, msg: "Subcategory should be in String only" });
      }
    }

    if (authorId) {
      if (!mongoose.isValidObjectId(authorId)) {
        return res.status(400).send({ status: false, msg: "!Oops authorId is not valid" })
      }
    }

    let blogDetails = await blogModel.find({ $and: [{ isDeleted: false, isPublished: true }, allblog] })

    if (!blogDetails) {
      return res.status(404).send({ status: false, msg: "Blog not found" });
    }
    else {
      return res.status(200).send({ status: true, data: blogDetails });
    }
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message })
  }
}


//------------------------------updateBlog api----------------------//

const updateBlog = async function (req, res) {
  try {

    let blogId = req.params.blogId
    let update = req.body

    let { title, body, tags, subcategory } = update

    if (Object.keys(update).length == 0) {
      return res.status(400).send({ status: false, msg: "Incomplete request, provide data for updation" })
    }

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).send({ status: false, msg: "!Oops BlogId is not valid" })
    }

    if (title) {
      if (!stringVerify(title)) {
        return res.status(400).send({ status: false, msg: "Title should be in String only" });
      }
    }

    if (body) {
      if (!stringVerify(body)) {
        return res.status(400).send({ status: false, msg: "Body should be in String only" });
      }
    }

    if (tags) {
      if (!stringVerify(tags)) {
        return res.status(400).send({ status: false, msg: "Tags should be in String only" });
      }
    }

    if (subcategory) {
      if (!stringVerify(subcategory)) {
        return res.status(400).send({ status: false, msg: "Subcategory should be in String only" });
      }
    }

    let findBlog = await blogModel.findOne({ _id: blogId })

    if (!findBlog) {
      return res.status(404).send({ status: false, msg: "Blog not found" });
    }
    if (findBlog.isDeleted == true) {
      return res.status(404).send({ status: false, msg: "Blog is already deleted" })
    }

    let updateBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { title: title, body: body, isPublished: true, publishedAt: Date.now() }, $addToSet: { tags: tags, subcategory: subcategory } }, { new: true, upsert: true });

    return res.status(200).send({ status: true, data: updateBlog });
  }
  catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
}


//-------------------------------deleteByPathParams api------------------------//

const deleteBlogByPathParam = async function (req, res) {

  try {
    let blogId = req.params.blogId

    let blogData = await blogModel.findById(blogId)

    if (!blogData) {
      return res.status(404).send({ status: false, msg: "No Blog exists with this blogId" });
    }

    if (blogData.isDeleted === true) {
      return res.status(404).send({ status: false, msg: "Blog is already deleted" });
    }

    let deleteBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
    res.status(200).send({ status: true, msg: "Blog is sucessfully deleted" });
  }
  catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
}


//--------------------deleteByQueryParam api-----------------------//

const deleteByQueryParam = async function (req, res) {
  try {

    let query = req.query
    let { authorId } = query
    if (Object.keys(query).length == 0) {
      return res.status(400).send({ status: false, msg: "input is required" });
    }

    if (authorId) {
      if (!mongoose.Types.ObjectId.isValid(authorId)) {
        return res.status(400).send({ status: false, msg: "!Oops authorId is not valid" })
      }
      const checkauthorId = await authorModel.findById(authorId)
      if (!checkauthorId) {
        return res.status(400).send({ status: false, msg: "!Oops authorId not found" })
      }
    }

    let blogDetails = await blogModel.findOne({ $and: [query, { isPublished: false, isDeleted: false }] })
    if (blogDetails) {
      let tokensId = req.decodedToken

      if (blogDetails.authorId.toString() !== tokensId) {
        return res.status(403).send({ status: false, msg: "Unauthorised User" })
      }

      await blogModel.updateMany(query, { $set: { isDeleted: true, deletedAt: new Date() } })

      return res.status(200).send({ status: true, msg: "Blog deleted successfully" })

    } else {
      return res.status(404).send({ status: false, msg: "Blog already deleted" })
    }
  }
  catch (error) {
    return res.status(500).send({ status: false, error: error.message })
  }
}




module.exports = { createBlog, getBlog, updateBlog, deleteBlogByPathParam, deleteByQueryParam }
