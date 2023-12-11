import axios from 'axios'
const API=axios.create({baseURL:"https://ark-social-media-clone.onrender.com"})
//const host='http://localhost:5000'

export const LogIn =(formData)=>API.post('/auth/login',formData)
export const SignUp =(formData)=>API.post('/auth/register',formData)