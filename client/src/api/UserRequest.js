import axios from 'axios'

const API=axios.create({baseURL:"https://ark-social-media-clone.onrender.com"})

export const getUser=(userid)=>API.get(`/user/${userid}`) 

export const updateUser=(id,formData)=>API.put(`/user/${id}`,formData)

export const getAllUser=()=>API.get('/user')

export const followUser=(id,data)=>API.put(`/user/${id}/follow`,data)

export const unFollowUser=(id,data)=>API.put(`/user/${id}/unfollow`,data)