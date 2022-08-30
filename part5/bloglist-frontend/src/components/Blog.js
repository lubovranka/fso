import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete }) => {
    const [visibility, setVisibility] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const toggleVisibility = () => {
        setVisibility(prev => !prev)
    }
    return (
        <div style={blogStyle}>
            {blog.title} {blog.author} <button onClick={toggleVisibility} >{visibility ? 'hide' : 'view'}</button>
            <div style={{ display: visibility ? '' : 'none' }}>
                {blog.url}<br />
          likes: {blog.likes} <button onClick={() => handleLike({ ...blog, likes: blog.likes + 1, user: blog.user[0].id })}>like</button>
                <button onClick={() => {if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) === true) {handleDelete(blog)}}}>delete</button>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}

export default Blog