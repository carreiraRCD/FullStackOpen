import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const allUrl = 'api/all'

const getAll = () => {
    const req = axios.get(baseUrl+allUrl)
    return req.then(res => res.data)
}

export default {getAll}