import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const request = await axios.get(baseUrl);
    const data = await request.data;
    data.sort((a, b) => b.likes - a.likes);
    return data;
};

const getBlog = async (id) => {
    const request = await axios.get(baseUrl);
    const data = await request.data;
    const blog = data.filter((blog) => blog.id === id);
    return blog;
};

const create = async (newBlog) => {
    const config = {
        headers: { authorization: token },
    };

    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
};

const like = async (liked) => {
    const config = {
        headers: { authorization: token },
    };

    const response = await axios.put(`${baseUrl}/${liked.id}`, liked, config);
    return response.data;
};

const deleteBlog = async (id) => {
    const config = {
        headers: { authorization: token },
    };

    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
};

const addComment = async (id, comment) => {
    const config = {
        headers: { authorization: token },
    };
    await axios.put(
        `${baseUrl}/${id}`,
        { comment: comment },
        config
    );
};

export default {
    getAll,
    create,
    setToken,
    like,
    deleteBlog,
    getBlog,
    addComment,
};
