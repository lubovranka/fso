import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

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
      e.target[0].value = ""
      e.target[1].value = ""
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

      setMessage(`a new blog ${e.target[0].value} by ${e.target[1].value} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogs(await blogService.getAll())
      e.target[0].value = ""
      e.target[1].value = ""
      e.target[2].value = ""
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
          username<input name="username" type="text"/><br />
          password<input name="password" type="password"/><br />
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {error && <p className='error'>{error}</p>}
      {message && <p className='success'>{message}</p>}
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      <h2>Create new</h2>
      <form onSubmit={handleNewBlog}>
        title: <input /><br />
        author: <input /><br />
        url: <input /><br />
        <button>create</button>
      </form><br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
