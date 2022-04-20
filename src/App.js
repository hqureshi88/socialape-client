import * as React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import history from './history';
import './App.css'; 
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
//functions
import Navbar from './Functions/Navbar';
import AuthRoute from './util/AuthRoute';
//Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';


const theme = createTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp*1000 < Date.now()){
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
   <MuiThemeProvider theme={theme}>
     <div className="App">
      <Router>
      <Navbar/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <AuthRoute exact path="/login" element={<Login/>} authenticated={authenticated}/>
            <AuthRoute exact path="/signup" element={<Signup/>} authenticated={authenticated}/>
          </Routes>
        </div>   
      </Router>
    </div>
   </MuiThemeProvider>
  );
}

export default App;
