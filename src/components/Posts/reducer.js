import {FETCH_ALL,FETCH_BY_SEARCH,CREATE,CHANGE_ID,UPDATE,DELETE,LIKE,START_LOADING,END_LOADING, FETCH_POST, COMMENT} from './constants'
const reducer = (state ={posts :[],post : null,currentId : null,isLoading :true},action) => {
    switch(action.type){
        case FETCH_ALL:
            return {...state,posts :action.payload.data,currentPage :action.payload.currentPage,totalPages:action.payload.totalPages}
        case FETCH_POST:
            return {...state,post : action.payload}
        case FETCH_BY_SEARCH:
            return {...state,posts : action.payload}
        case CREATE:
            return {...state,posts :[...state.posts,action.payload]}
        case CHANGE_ID:
            return {...state,currentId : action.payload}
        case UPDATE:
            return {currentId : null,posts:state.posts.map(post => post._id === action.payload._id ? action.payload : post)}
        case DELETE:
            return {...state,posts: state.posts.filter(post => post._id !== action.payload)}
        case LIKE:
            return {...state,posts:state.posts.map(post => post._id === action.payload._id ? action.payload : post)}
        case COMMENT:
            return {...state,posts:state.posts.map(post => post._id === action.payload._id ? action.payload : post)}
        case START_LOADING:
            return {...state,isLoading : true }
        case END_LOADING:
            return {...state,isLoading : false }
        default:
            return state
    }
}

export default reducer