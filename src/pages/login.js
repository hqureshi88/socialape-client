import React, {useState } from "react";
import withStyles from "@material-ui/styles/withStyles";
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import themeFile from "../util/theme";

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = {
    ...themeFile
};

function Login(props){
    
    const { classes } = props;
    const [email, setEmail] = useState({email: ""});
    const [password, setPassword] = useState({password: ""});
    const [loading, setLoading] = useState({loading: false});
    const [errors, setErrors] = useState({errors: {}});
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        
        event.preventDefault();

        setLoading({
            loading: true
        });

        const userData = {
            email: email.email,
            password: password.password
        }
        async function postData() {
            return await axios.post('/login', userData); 
        }

        const loginResult = Promise.resolve(postData());
        
        loginResult
        .then(res => {
            
            console.log(res.data);
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
            setLoading({
                loading: false
            });
            navigate('/');
        })
        .catch(err => {
            console.log(err);
            setErrors({
                errors: err.response.data,
            })
            setLoading({
                loading: false
            });
        })
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name === "email"){
            setEmail({
                [name]: value
            });
        } else if (name === "password"){
            setPassword({
                [name]: value
            });
        }
    }

    return( 
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <img src={AppIcon} alt="monkey"className={classes.image}/>
                <Typography variant="h2" className={classes.pageTitle}>
                    Login
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField 
                     id="email" 
                     name="email" 
                     type="email" 
                     label="Email" 
                     className={classes.textField}
                     onChange={handleChange}
                     helperText={errors.errors ? errors.errors.email : null}
                     error={errors.errors.email ? true : false}
                     value={email.email}  
                     fullWidth
                     />
                    <TextField 
                     id="password" 
                     name="password" 
                     type="password" 
                     label="Password" 
                     className={classes.textField}
                     onChange={handleChange}
                     helperText={errors.errors ? errors.errors.password : null} 
                     error={errors.errors.password ? true : false}
                     value={password.password}  
                     fullWidth
                     />
                     {errors.errors.general && (
                         <Typography variant="body2" className={classes.customError}>
                            {errors.errors.general}
                         </Typography>
                     )}

                    <Button 
                     type="submit" 
                     variant="contained" 
                     color="primary" 
                     className={classes.button}
                     disabled={loading.loading}
                    >
                     Login
                     {loading.loading && (
                         <CircularProgress size={30} className={classes.progress}/>
                     )}
                    </Button>
                    <br />
                    <br />
                    <small>dont have an account? sign up <Link to="/signup">here</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default  withStyles(styles)(Login);
