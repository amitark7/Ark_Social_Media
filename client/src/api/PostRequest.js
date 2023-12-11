import axios from 'axios'

const API=axios.create({baseURL:"https://ark-social-media-clone.onrender.com"})

export const getTimelinePosts=(id)=>API.get(`/post/${id}/timeline`)


export const likePost=(id,userId)=>API.put(`/post/${id}/like`,{userid:userId})