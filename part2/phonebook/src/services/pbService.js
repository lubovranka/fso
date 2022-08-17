import axios from "axios"

const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseURL).then(res => res.data)
}

const create = (newPerson) => {
    return axios.post(baseURL, newPerson).then(res => res.data)
}

const updateNumber = (personToUpdate, number) => {
    return axios.put(`${baseURL}/${personToUpdate.id}`, {...personToUpdate, number: number}).then(res => res.data)
}

const deleteNumber = id => axios.delete(`${baseURL}/${id}`).then(res => console.log(res))

export default { getAll, create, deleteNumber, updateNumber }