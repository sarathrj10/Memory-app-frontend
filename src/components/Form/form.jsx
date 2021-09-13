import useStyles from './styles'
import {TextField,Typography,Button,Paper} from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {createPost,changeID,updatepost} from '../Posts/action'
const Form = () => {
    const dispatch = useDispatch()
    const post = useSelector(state => state.posts.currentId ? state.posts.posts.find(p => p._id === state.posts.currentId) : null)
    const user = useSelector(state => state.auth.authData ? state.auth.authData.result : undefined)
    const [postData,setPostData] = useState({
        title:'',message: '',tags:'',selectedFile:''
    })
    useEffect(()=>{
        if(post){
            setPostData(post)
        }
    },[post])
    const classes = useStyles()
    const submitHandler = (e) => {
        e.preventDefault()
        if(post){
            dispatch(updatepost(post._id,{...postData, name:user.name}))
        }else{
            dispatch(createPost({...postData, name:user.name}))
        }
        setPostData({  title:'',message: '',tags:'',selectedFile:''})
    }
    const resetHandler = () => {
        setPostData({ title:'',message: '',tags:'',selectedFile:''})
        dispatch(changeID(null))
    }

    if(!user){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your memories and like other's memories.
                </Typography>
            </Paper>
        )
    }
    return (
       <Paper className={classes.paper} elevation={6}>
           <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={submitHandler}> 
                <Typography variant="h6">{post ? 'Edting' :'Creating'} a Memory</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=>{setPostData({...postData,title:e.target.value})}} required/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e)=>{setPostData({...postData,message:e.target.value})}} required/>
                <TextField name="tags" variant="outlined" label="Tags(coma separated)" fullWidth value={postData.tags} onChange={(e)=>{setPostData({...postData,tags:e.target.value.split(',')})}} required/>
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64})=>{setPostData({...postData,selectedFile: base64})}}/>
                </div>
                <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth>Submit</Button>
                <Button  variant="contained" color="secondary" size="small" fullWidth onClick={resetHandler}>Clear</Button>
           </form>
       </Paper>
    )
}

export default Form