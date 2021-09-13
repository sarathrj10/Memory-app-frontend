import { Container } from "@material-ui/core";
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import { useSelector } from "react-redux";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Toster from "./components/Toster/Toster";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = useSelector(state => state.auth.authData)
  const {showError,message} = useSelector(state => state.error)
  return (
    <BrowserRouter>
        <Container maxWidth="xl">
            <NavBar/>
            <Switch>
                <Route path="/" exact component={()=> <Redirect to="/posts"/>}/>
                <Route path="/posts" exact component={Home}/>
                <Route path="/posts/search" exact component={Home}/>
                <Route path="/posts/:id" exact component={PostDetails}/>
                <Route path="/auth" exact component={()=> user ? <Redirect to="/posts"/> : <Auth/>}/>
                <Route path="*" component={()=><h1 style={{textAlign:'center'}}>Page Not Found</h1>}/>
            </Switch>
            <Toster showError={showError} message={message}/>
       </Container>
   </BrowserRouter>
  );
};

export default App;
