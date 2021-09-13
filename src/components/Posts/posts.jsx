import Post from "./post/post"
import { useSelector } from "react-redux"
import {Grid,CircularProgress} from '@material-ui/core'
import useStyles from './styles'
const Posts = () => {
    const {posts,isLoading} = useSelector(state => state.posts)
    const classes = useStyles()
    if(!posts.length && !isLoading) return <h3>No posts available</h3>
    return (
       isLoading ?  <CircularProgress/>: (
        <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
            {
                posts.map(post => <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}><Post post={post}/></Grid>)
            }
        </Grid>
       )
    )
}

export default Posts