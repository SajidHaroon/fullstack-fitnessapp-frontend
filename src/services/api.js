// This file will basically handle all the frontend and backend communuication- 31-08
// Instead of insomnia where we used to make get and post requests, now we dont have to

import axios from 'axios'

const api = axios.create({
    baseURL:'https://fullstack-fitnessapp-backend.herokuapp.com'
})

export default api