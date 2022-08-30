import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  const data = await request.data
  data.sort((a, b) => b.likes - a.likes)
  return data
}

const create = async newBlog => {
  const config = {
    headers: {authorization: token}
  }

  const response = await  axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async liked => {
  const config = {
    headers: {authorization: token}
  }

  const response = await axios.put(`${baseUrl}/${liked.id}`, liked, config)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: {authorization: token}
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, setToken, like, deleteBlog }