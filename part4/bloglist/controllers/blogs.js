const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  const blog = request.body
  if (!blog.title || !blog.url) {
    response.status(400).end()
    return
  }

  if (!blog.likes) {blog.likes = 0}
  
  const newBlog = new Blog(blog);

  newBlog.save().then((result) => {
    response.status(201).json(result);
  });
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const oldBlog = await Blog.findById(id)
  const updatedBlog = {...oldBlog._doc, ...body}
  
  await Blog.findByIdAndUpdate(id, updatedBlog)
  response.status(204).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

module.exports = blogsRouter;
