import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';

const BlogView = ({ handleLike }) => {
    const [blog, setBlog] = useState({});
    const id = useParams().id;
    const user = useSelector((state) => state.user);

    useEffect(() => {
        blogService.getBlog(id).then((res) => setBlog(res[0]));
        blogService.setToken(user.token);
    }, []);

    if (!blog.title) {
        return null;
    }

    const handleNewComment = async (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        e.target.comment.value = '';
        await blogService.addComment(blog.id, comment);
        await blogService.getBlog(id).then((res) => setBlog(res[0]));
    };

    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.url}</p>
            <p>{blog.likes}</p>
            <button
                onClick={async () => {
                    await handleLike({
                        ...blog,
                        likes: blog.likes + 1,
                        user: blog.user.id,
                    });
                    blogService.getBlog(id).then((res) => setBlog(res[0]));
                }}
            >
                like
            </button>
            <p>added by {blog.user[0].name}</p>
            <form onSubmit={handleNewComment}>
                <input type="text" name="comment" />
                <button type="submit">add comment</button>
            </form>
            <h2>comments</h2>
            <ul>
                {blog.comments.length ? (
                    blog.comments.map((comment) => (
                        <li key={comment}>{comment}</li>
                    ))
                ) : (
                    <ul>no comments</ul>
                )}
            </ul>
        </div>
    );
};

export default BlogView;
