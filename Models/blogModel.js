const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

<<<<<<< HEAD
const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    authorId: {
        type: objectId,
        required: true,
        ref: "Author"
    },
    tags: [{
        type: String,
        trim: true
    }],
    category: {
        type: String,
        required: true,
        trim: true
    },
    subcategory: [{
        type: String,
        trim: true
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: null
    }

},
    { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema)
=======
const blogSchema = new mongoose.Schema ({
    //{ title: {mandatory}, body: {mandatory}, authorId: {mandatory, refs to author model}, tags: {array of string}, category: {string, mandatory}, subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }, createdAt, updatedAt, deletedAt: {when the document is deleted}, isDeleted: {boolean, default: false}, publishedAt: {when the blog is published}, isPublished: {boolean, default: false}}
title: {
    type: String,
    required: true
},
body: {
    type: String,
    required: true
},
authorId: {
    type: objectId,
    required: true,
    ref: "Author"
},
tags: {
    type: [String],
},
category: {
    type: String,
    required: true

},
subCategory: {
    type: [String],
},
isDeleted: {
    type: Boolean,
    default: false
},
isPublished: {
    type: Boolean,
    default: false
} 
},
{ timestamps: true });

module.exports = mongoose.model('Blog', blogSchema)


>>>>>>> 71979613dbfcf9c9eedc82f2718a431fe0304ff5
