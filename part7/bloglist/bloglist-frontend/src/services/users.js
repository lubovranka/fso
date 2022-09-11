import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/users';

const getAllUsers = async () => {
    const res = await axios.get(baseUrl);
    // const data = await res.data;
    return await res.data;
};

const findUser = async (id) => {
    const res = await axios.get(baseUrl);
    const filtered = res.data.filter((user) => user.id === id);
    return filtered;
};

export default { getAllUsers, findUser };
