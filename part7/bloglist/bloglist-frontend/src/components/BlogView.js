import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';

const BlogView = ({ handleLike }) => {
    const [blog, setBlog] = useState({});
    const id = useParams().id;
    useEffect(() => {
        blogService.getBlog(id).then((res) => setBlog(res[0]));
    }, []);

    if (!blog.title) {
        return null;
    }

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
        </div>
    );
};

export default BlogView;
