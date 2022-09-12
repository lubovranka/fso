import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog, handleLike, handleDelete }) => {
    const [visibility, setVisibility] = useState(false);

    const toggleVisibility = () => {
        setVisibility((prev) => !prev);
    };
    return (
        <div className="blog">
            <div className='blogHeader'>
                <span id="header">
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}
                    </Link>
                </span>{' '}
                <button onClick={toggleVisibility} className="descToggler">
                    {visibility ? 'hide' : 'view'}
                </button>
            </div>
            <div style={{ display: visibility ? '' : 'none' }} className="desc">
                {blog.url}
                <br />
                likes: {blog.likes}
                <div className="blogInteraction">
                    <button
                        onClick={() =>
                            handleLike({
                                ...blog,
                                likes: blog.likes + 1,
                                user: blog.user[0].id,
                            })
                        }
                        id="likeBtn"
                    >
                        like
                    </button>
                    <button
                        onClick={() => {
                            if (
                                window.confirm(
                                    `Remove blog ${blog.title} by ${blog.author}?`
                                ) === true
                            ) {
                                handleDelete(blog);
                            }
                        }}
                        id="deleteBtn"
                    >
                        delete
                    </button>
                </div>
            </div>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default Blog;
