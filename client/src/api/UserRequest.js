import axios from 'axios'

const API=axios.create({baseURL:"http://localhost:5000"})

export const getUser=(userid)=>API.get(`/user/${userid}`) 