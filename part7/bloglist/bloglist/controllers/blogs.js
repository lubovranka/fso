const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user")
const jwt = require('jsonwebtoken');

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
});

blogsRouter.post("/", async (request, response) => {
  const blog = request.body
  if (!blog.title || !blog.url) {
    return response.status(400).json({error: 'need to to provide blog title and url'}).end()
  }

  const token = request.token
  
  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } 
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!User.findById(decodedToken.id)) {return response.status(401).json({ error: 'not a user' })}
  
  const user = request.user

  if (!blog.likes) {blog.likes = 0}
  
  const newBlog = new Blog({
    ...blog,
    user: decodedToken.id
  });


  const savedBlog = await newBlog.save()
  user.blog = user.blog.concat(savedBlog)
  await user.save()
  response.status(201).json(savedBlog).end()
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  console.log('ran  ')
  const token = request.token
  
  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } 
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const oldBlog = await Blog.findById(id)
  let updatedBlog = {...oldBlog._doc, ...body}

  if (body.comment) {
    updatedBlog = {...updatedBlog, comments: [...updatedBlog.comments, body.comment]}
  }
 
  if (oldBlog.user[0].toString() === decodedToken.id) {
    await Blog.findByIdAndUpdate(id, updatedBlog)
    response.status(204).json(updatedBlog).end()
  } else {
    return response.status(401).json({ error: 'Unauthorized' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const token = request.token
  
  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } 
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const blog = await Blog.findById(id)
  const user = request.user

  if (blog.user[0].toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(id)
    user.blog = user.blog.map(blog => blog.toString()).filter(blogId => blogId !== id)
    await user.save()
    return response.status(204).end()
  } else {
    return response.status(401).json('Unauthorized').end()
  }
})

module.exports = blogsRouter;
