const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

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

const users = [
    {
        username: "happyMonkey",
        name: "Mark",
        password: "happier"
    }, 
    {
        username: "swimmyDolphin",
        name: "Dolphinator",
        password: "wetter"
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    for (let blog of blogs) {
        let newBlog = new Blog(blog)
        await newBlog.save()
    }

    for (let user of users) {
        await api
                .post('/api/users')
                .send(user)
                .expect(201)
    }
})

describe('blogs api', () => {
    it('can get all blogs', async () => {
        const newBlogs = await api
                        .get('/api/blogs')
        expect(newBlogs.body.length).toBe(blogs.length)
    })
    it('can get all users', async () => {
        const newUsers = await api
                        .get('/api/users')
        expect(newUsers.body.length).toBe(users.length)
    })
    it('can create new user', async () => {
        await api
            .post('/api/users')
            .send({
                "username": "happyMbfvonjjkeys",
                "name": "Mark",
                "password": "happier"
            })
            .expect(201)
    })
    it('cant create duplicate user', async () => {
        await api
            .post('/api/users')
            .send({
                "username": "happyMonkey",
                "name": "Mark",
                "password": "happier"
            })
            .expect(400)
    })
    it('cant create bad user', async () => {
        await api
            .post('/api/users')
            .send({
                "username": "hen",
                "name": "Mark",
                "password": "tor"
            })
            .expect(400)
    })
    it('can login user', async () => {
        const res = await api
                            .post('/api/login')
                            .send({
                                "username": "happyMonkey",
                                "password": "happier"
                            })
                            .expect(200)
        expect(res.body.token).toBeTruthy()
    })
    it('cant login wrong user', async () => {
        const res = await api
                            .post('/api/login')
                            .send({
                                "username": "happyMonkey",
                                "password": "happiest"
                            })
                            .expect(401)
        expect(res.body.token).toBeFalsy()
    })
    it('user can post', async () => {
        const user = await api
                            .post('/api/login')
                            .send(users[0])

        await api
                .post('/api/blogs')
                .set('authorization', `bearer ${user.body.token}`)
                .send({
                    "title": "user with bearer",
                    "url": "someURL",
                    "author": "me",
                    "likes": 5
                })
                .expect(201)
    })
    it('non-user cant post', async () => {
        await api
                .post('/api/blogs')
                .send({
                    "title": "user with bearer",
                    "url": "someURL",
                    "author": "me",
                    "likes": 5
                })
                .expect(401)
    })
    it('bad jwt cant post', async () => {
        await api
                .post('/api/blogs')
                .set('authorization', 'bearer fdjdsfdhj')
                .send({
                    "title": "user with bearer",
                    "url": "someURL",
                    "author": "me",
                    "likes": 5
                })
                .expect(400)
    })
    it('user can delete', async () => {
        const user = await api
                            .post('/api/login')
                            .send(users[0])
        const newBlog = await api
                .post('/api/blogs')
                .set('authorization', `bearer ${user.body.token}`)
                .send({
                    "title": "user with bearer",
                    "url": "someURL",
                    "author": "me",
                    "likes": 5
                })
        await api
                .delete(`/api/blogs/${newBlog.body.id}`)
                .set('authorization', `bearer ${user.body.token}`)
                .expect(204)
    })
    it('non-user cant delete', async () => {
        const user = await api
                            .post('/api/login')
                            .send(users[0])
        const newBlog = await api
                .post('/api/blogs')
                .set('authorization', `bearer ${user.body.token}`)
                .send({
                    "title": "user with bearer",
                    "url": "someURL",
                    "author": "me",
                    "likes": 5
                })
        await api
                .delete(`/api/blogs/${newBlog.body.id}`)
                .expect(401)
    })
    it('bad jwt cant delete', async () => {
        const user = await api
                            .post('/api/login')
                            .send(users[0])
        const newBlog = await api
                .post('/api/blogs')
                .set('authorization', `bearer ${user.body.token}`)
                .send({
                    "title": "user with bearer",
                    "url": "someURL",
                    "author": "me",
                    "likes": 5
                })
        await api
                .delete(`/api/blogs/${newBlog.body.id}`)
                .set('authorization', 'bearer dfjdjklas')
                .expect(400)
    })
    it('user can update', async () => {
        const user = await api
                            .post('/api/login')
                            .send(users[0])
        const newBlog = await api
                .post('/api/blogs')
                .set('authorization', `bearer ${user.body.token}`)
                .send({
                    "title": "user with bearer",
                    "url": "someURL",
                    "author": "me",
                    "likes": 5
                })
        await api
                .put(`/api/blogs/${newBlog.body.id}`)
                .set('authorization', `bearer ${user.body.token}`)
                .send({title: "test title"})
                .expect(204)
    })
    it('non-user cant update', async () => {
        const user = await api
                            .post('/api/login')
                            .send(users[0])
        const newBlog = await api
                .post('/api/blogs')
                .set('authorization', `bearer ${user.body.token}`)
                .send({
                    "title": "user with bearer",
                    "url": "someURL",
                    "author": "me",
                    "likes": 5
                })
        await api
                .put(`/api/blogs/${newBlog.body.id}`)
                .send({title: "test title"})
                .expect(401)
    })
    it('bad jwt cant update', async () => {
        const user = await api
                            .post('/api/login')
                            .send(users[0])
        const newBlog = await api
                .post('/api/blogs')
                .set('authorization', `bearer ${user.body.token}`)
                .send({
                    "title": "user with bearer",
                    "url": "someURL",
                    "author": "me",
                    "likes": 5
                })
        await api
                .put(`/api/blogs/${newBlog.body.id}`)
                .set('authorization', 'bearer dasdsad')
                .send({title: "test title"})
                .expect(400)
    })
})

afterAll(async () => {
    mongoose.connection.close()
})