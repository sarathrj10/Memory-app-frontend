import React,{useEffect} from 'react'
import {Pagination,PaginationItem} from '@material-ui/lab'
import {getPosts} from '../Posts/action'
import { useDispatch,useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import useStyles from './style'

const Paginate = ({page}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {totalPages} = useSelector(state => state.posts)
    useEffect(()=>{
        dispatch(getPosts(page))
      },[dispatch,page])
    return (
     <Pagination
        className={{ul:classes.ul}}
        count={totalPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={item =>(
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
        )}
     />
    )
}

export default Paginate
