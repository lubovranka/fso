const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2
    }  
]

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of blogs) {
        let newBlog = new Blog(blog)
        await newBlog.save()
    }
}, 100000)

describe('blogs api', () => {
    test('fetch all blogs', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(blogs.length)
    }, 100000)

    test('has id', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body[0]).toHaveProperty('id')
    })
    test('can post', async() => {
        const newBlog = {title: "Some title", author: "Some guy", url: "some url", "likes": 7}
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const res = (await api.get('/api/blogs')).body
        expect(res).toHaveLength(blogs.length + 1)

        const titles = res.map(blog => blog.title)
        expect(titles).toContain('Some title')
    })
    test('can post without likes', async () => {
        const newBlog = {title: "0 likes", author: "Unpopular guy", url: "sad url"}

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const res = (await api.get('/api/blogs')).body
        expect(res).toHaveLength(blogs.length + 1)

        const titles = res.map(blog => blog.title)
        expect(titles).toContain('0 likes')

        const noLikes = res.find(blog => blog.title === "0 likes")
        expect(noLikes.likes).toBe(0)
    })
    test('cant post without title and url', async () => {
        const newBlog = {author: "Unpopular guy", likes: 2}

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
    test('can delete blog', async () => {
        const currentBlogs = (await api.get('/api/blogs')).body
        const blogToDelete = currentBlogs[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const afterDelete = (await api.get('/api/blogs')).body
        expect(afterDelete.length).toBe(currentBlogs.length - 1)

        const newBlogs = afterDelete.map(blog => blog.title)
        expect(newBlogs).not.toContain(blogToDelete.title)
    })
    test('can update blog', async () => {
        const currentBlogs = (await api.get('/api/blogs')).body
        const blogToUpdate = currentBlogs[0]
        const updates = { likes: 222 }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updates)
            .expect(204)
            
        const afterUpdateBlogs = (await api.get('/api/blogs')).body
        expect(afterUpdateBlogs.length).toBe(blogs.length)

        const updatedBlog = afterUpdateBlogs[0]
        expect(updatedBlog.likes).toBe(222)
    })
})

afterAll(async () => {
    mongoose.connection.close()
})