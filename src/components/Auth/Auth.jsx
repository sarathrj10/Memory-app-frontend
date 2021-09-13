import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import GoogleLogin from 'react-google-login'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {signUp,signIn} from './action'
import { useHistory } from 'react-router-dom'
import Icon from './Icon'
import useStyles from './styles'
import Input from './input'

const initialState = {firstName: '',lastName:'',email:'',password:'',confirmPassword:''}
const Auth = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [isSignUp,setIsSignUp] = useState(false)
    const [formData,setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const handleShowPassword = () => setShowPassword((prev)=>!prev)
    const switchMode  = () => {
        setIsSignUp((prev)=>!prev)
        setShowPassword(false)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if(isSignUp){
            dispatch(signUp(formData,history))
        }else{
            dispatch(signIn(formData,history))
        }
    }
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const googleSuccess = async (res) => {
        try{
            const result = res?.profileObj;
            const token = res?.tokenId;
            dispatch({type : 'AUTH', data:{result,token}})
            history.push('/')
        }catch(e){
            console.log(e.message)
        }
    }

    const googleFailure = (e) => {
        console.log("google_error",e)
    }

    return (
       <Container component="main" maxWidth="xs">
           <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignUp? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} type="text" autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} type="text"  half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}/>}
                    </Grid>
                    <Button type="Submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignUp? 'Sign Up' : 'Sign In'}</Button>
                    <GoogleLogin
                        clientId="975865591736-5o60f02i2iu7a21kf3lagu9sh0upfb8r.apps.googleusercontent.com"
                        render={(renderProps)=>(
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy ="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{isSignUp? 'Already have an account? Sign In' : "Don't have an account ? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
           </Paper>
       </Container>
    )
}
export default Auth
