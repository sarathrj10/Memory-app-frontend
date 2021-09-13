import { Container,Grow, Grid, Paper, AppBar,TextField,Button } from "@material-ui/core";
import { useHistory,useLocation } from "react-router-dom"; 
import { useState } from "react";
import { useDispatch } from "react-redux";
import ChipInput from 'material-ui-chip-input'
import {getPostsBysearch} from '../Posts/action'
import Pagination from "../Pagination/Pagination";
import useStyles from './styles'
import Posts from "../Posts/posts";
import Form from "../Form/form";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const query = useQuery()
    const history = useHistory()
    const page = query.get("page") || 1
    const searchQuery = query.get("searchQuery")
    const [search,setSearch] = useState('')
    const [tags,setTags] = useState([])

    const searchPost = () => {
        if(search.trim() || tags.length){
            dispatch(getPostsBysearch({search,tags: tags.join(',')}))
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else{
            history.push('/')
        }
    }
    const handleKeyPress = (e)=>{
        if(e.keyCode === 13){
            searchPost()
        }
    }
    const handleAdd = (tag) => setTags([...tags,tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete))

    return(
        <Grow in>
        <Container maxWidth="xl">
            <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e)=>{setSearch(e.target.value)}} onKeyPress={handleKeyPress}/>
                        <ChipInput style={{margin: '10px 0'}} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined"/>
                        <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                    </AppBar>
                    <Form/>
                    {(!searchQuery && !tags.length) && 
                    (
                      <Paper elevation={6} className={classes.pagination}>
                        <Pagination page={page}/>
                      </Paper>
                    )
                    }
                    
                </Grid>
            </Grid>
        </Container>
       </Grow>
    )
}
export default Home