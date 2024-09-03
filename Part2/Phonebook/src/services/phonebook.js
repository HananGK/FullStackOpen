import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getNumbers = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createNumber = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const deleteNumber = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response=>response.data)
}

const updateNumber = (id, personObject) => {
    const request = axios.put(`${baseUrl}/${id}`, personObject)
    return request.then(response=>response.data)
}

export default {getNumbers, createNumber, deleteNumber, updateNumber}