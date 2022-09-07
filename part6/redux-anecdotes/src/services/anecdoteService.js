const { default: axios } = require("axios");

const _URL = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => {
    const res = await axios.get(_URL);
    return res.data;
};

const createAnecdote = async (data) => {
    const res = await axios.post(_URL, data)
    return res.data
}

export { getAnecdotes, createAnecdote };
