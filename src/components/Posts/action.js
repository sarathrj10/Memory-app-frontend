import * as api from '../../api'
import {FETCH_ALL,FETCH_POST,FETCH_BY_SEARCH,CREATE,CHANGE_ID,UPDATE,DELETE,LIKE,COMMENT,START_LOADING,END_LOADING} from './constants'
import {LOGOUT} from '../Auth/constants'

function showToaster(msg,dispatch){
    dispatch({type:'SHOW_ERR',payload:msg})
    setTimeout(()=>{
        dispatch({type:'HIDE_ERR',payload:msg})
    },4000)
}

export const getPosts = (page) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPosts(page)
        dispatch({type:FETCH_ALL,payload : data})
        dispatch({type: END_LOADING})
    }catch(e){
        showToaster(e.message,dispatch)
        dispatch({type: END_LOADING})
    }
}

export const getPost = (id) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPost(id)
        dispatch({type:FETCH_POST,payload : data})
        dispatch({type: END_LOADING})
    }catch(e){
        showToaster(e.message,dispatch)
        dispatch({type: END_LOADING})
    }
}

export const getPostsBysearch = (searchQuery) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING})
        const {data : {data}} = await api.fetchPostsBySearch(searchQuery)
        dispatch({type:FETCH_BY_SEARCH,payload:data})
        dispatch({type: END_LOADING})
    }catch(e){
        showToaster(e.message,dispatch)
        dispatch({type: END_LOADING})
    }
}

export const createPost = (post) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING})
        const {data} = await api.createAPost(post)
        dispatch({type:CREATE,payload : data})
        dispatch({type: END_LOADING})
    }catch(e){
        if(e.message === 'Request failed with status code 401'){
            dispatch({type:LOGOUT})
            return
        } 
        showToaster(e.message,dispatch)
        dispatch({type: END_LOADING})
    }
}

export const changeID = (id) => { return {type :CHANGE_ID,payload:id}}

export const updatepost = (id,post) => async(dispatch) => {
    try{
        const {data} = await api.updateAPost(id,post)
        dispatch({type:UPDATE,payload : data})
    }catch(e){
        if(e.message === 'Request failed with status code 401'){
            dispatch({type:LOGOUT})
            return
        } 
        showToaster(e.message,dispatch)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try{
        dispatch({type: START_LOADING})
        await api.deleteAPost(id)
        dispatch({type:DELETE,payload : id})
        dispatch({type: END_LOADING})
    }catch(e){
          if(e.message === 'Request failed with status code 401'){
            dispatch({type:LOGOUT})
            return
            } 
        showToaster(e.message,dispatch)
        dispatch({type: END_LOADING})
    }
}

export const likePost = (id) => async(dispatch) => {
    try{
        const {data} = await api.likeApost(id)
        dispatch({type:LIKE,payload : data})
    }catch(e){
          if(e.message === 'Request failed with status code 401'){
            dispatch({type:LOGOUT})
            return
            } 
            showToaster(e.message,dispatch)
    }
}

export const commentPost =(value,id) => async(dispatch) => {
    try{
        const {data} = await api.comment(value,id)
        dispatch({type:COMMENT,payload : data})
        return data.comments
    }catch(e){
        if(e.message === 'Request failed with status code 401'){
            dispatch({type:LOGOUT})
            return
        } 
        showToaster(e.message,dispatch)
    }
}