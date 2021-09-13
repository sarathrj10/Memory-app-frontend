import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import {Link} from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router";
import memoriesLogo from '../../images/memories-logo.png';
import memoriesText from '../../images/memories-Text.png';
import useStyles from './styles'

const NavBar = () => {
    const classes = useStyles()
    const user = useSelector(state => state.auth.authData)
    const dispatch = useDispatch()
    const history = useHistory()
    const logoutHandler = () => {
        dispatch({type : 'LOGOUT'})
        history.push('/')
    }
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px"/>
                <img className={classes.image} src={memoriesLogo} alt="memories" height="40px"/>
            </Link>
            <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}> 
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logoutHandler}>Logout</Button>
                </div>
            ):(
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
            </Toolbar>
        </AppBar>
    )
}
export default NavBar