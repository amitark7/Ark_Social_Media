import axios from 'axios'
const API=axios.create({baseURL:"http://localhost:5000"})
//const host='http://localhost:5000'

export const LogIn =(formData)=>API.post('/auth/login',formData)
export const SignUp =(formData)=>API.post('/auth/register',formData)