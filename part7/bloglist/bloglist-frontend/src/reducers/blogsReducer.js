import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const initialState = [];
const blogsReducer = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs(_, action) {
            const blogs = action.payload;
            return blogs;
        },
        addBlog(state, action) {
            const blog = action.payload;
            return { ...state, blogs: [...state.blogs, blog] };
        },
        likeBlog(state, action) {
            const id = action.payload;
            const blogs = state.blogs.map((blog) =>
                blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
            );
            return { ...state, blogs };
        },
        deleteBlog(state, action) {
            const id = action.payload;
            const blogs = state.blogs.filter((blog) => blog.id !== id);
            return { ...state, blogs };
        },
    },
});

export const initializeBlogs = () => {
    return async (dispatch) => {
        blogService.getAll().then(res => dispatch(setBlogs(res)));
    };
};

export const { setBlogs, addBlog, likeBlog, deleteBlog } = blogsReducer.actions;
export default blogsReducer;
