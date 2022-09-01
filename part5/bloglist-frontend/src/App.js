import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    const newBlogRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const storedUser = window.localStorage.getItem('loggedInBlogsUser')
        if (storedUser) {
            const thisUser = JSON.parse(storedUser)
            setUser(thisUser)
        }
    }, [])

    const handleLogin = async e => {
        e.preventDefault()

        try {
            const newUser = await loginService.login({
                username: e.target[0].value,
                password: e.target[1].value
            })

            window.localStorage.setItem('loggedInBlogsUser', JSON.stringify(newUser))

            setUser(newUser)
            e.target[0].value = ''
            e.target[1].value = ''
        } catch (err) {
            setError(err.response.data.error)
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInBlogsUser')
        setUser(null)
    }

    const handleNewBlog = async e => {
        e.preventDefault()
        try {
            blogService.setToken(user.token)
            await blogService.create({
                title: e.target[0].value,
                author: e.target[1].value,
                url: e.target[2].value
            })
            setBlogs(await blogService.getAll())
            newBlogRef.current.toggleVisibility()

            setMessage(`a new blog ${e.target[0].value} by ${e.target[1].value} added`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            e.target[0].value = ''
            e.target[1].value = ''
            e.target[2].value = ''
        } catch (err) {
            console.log(err)
            setError(err.response.data.error)
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    const handleLike = async liked => {
        try {
            blogService.setToken(user.token)
            await blogService.like(liked)
            setBlogs(await blogService.getAll())
            setMessage(`Liked ${liked.title}`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (err) {
            console.log(err)
            setError(err.response.data.error)
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    const handleDelete = async blog => {
        try {
            blogService.setToken(user.token)
            await blogService.deleteBlog(blog.id)
            setBlogs(await blogService.getAll())
            setMessage(`Deleted ${blog.title}`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (err) {
            console.log(err)
            setError(err.response.data.error)
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    if (!user) {
        return (
            <div>
                <h2>Log in to application</h2>
                {error && <p className='error'>{error}</p>}
                {message && <p className='success'>{message}</p>}
                <form onSubmit={handleLogin}>
          username<input name="username" type="text" id='usernameInput'/><br />
          password<input name="password" type="password" id='passwordInput'/><br />
                    <button type='submit' id='loginBtn'>login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            {error && <p className='error'>{error}</p>}
            {message && <p className='success'>{message}</p>}
            {user.name} logged in <button onClick={handleLogout} id='logoutBtn'>logout</button>
            <br />
            <Toggleable ref={newBlogRef}>
                <CreateBlog handleNewBlog={handleNewBlog} />
            </Toggleable>
            <br />
            <br />
            <div className='blogs'>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>
                )}
            </div>
        </div>
    )
}

export default App
