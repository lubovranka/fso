const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: [
        {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId,
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.String
        }
    ]
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
