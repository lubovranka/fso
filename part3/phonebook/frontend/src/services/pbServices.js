import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then((res) => res.data);
};

const update = (newPerson, id) => {
  return axios.put(`${baseURL}/${id}`, newPerson).then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((res) => res.data);
};

export { getAll, create, update, deletePerson };
