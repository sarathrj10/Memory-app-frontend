import axios from 'axios'
const API = axios.create({baseURL : 'https://memory-apps.herokuapp.com'})
API.interceptors.request.use((req)=>{
    const profile = localStorage.getItem('profile')
    if(profile){
        req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
    }
    return req
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createAPost = (newPost) => API.post('/posts',newPost)
export const updateAPost = (id,post) => API.patch(`${'/posts'}/${id}`,post)
export const deleteAPost = (id) => API.delete(`${'/posts'}/${id}`)
export const likeApost = (id) => API.patch(`${'/posts'}/${id}/likePost`)
export const comment = (value,id) =>API.post(`/posts/${id}/commentPost`,{value})

export const signIn = (FormData) => API.post('/user/signIn',FormData)
export const signUp = (FormData) => API.post('/user/signUp',FormData)

