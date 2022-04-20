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

function Signup(props){
    const { classes } = props;
    const [email, setEmail] = useState({email: ""});
    const [password, setPassword] = useState({password: ""});
    const [confirmPassword, setConfirmPassword] = useState({confirmPassword: ""});
    const [handle, setHandle] = useState({handle: ""});
    const [loading, setLoading] = useState({loading: false});
    const [errors, setErrors] = useState({errors: {}});
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        
        event.preventDefault();

        setLoading({
            loading: true
        });

        const newUserData = {
            email: email.email,
            password: password.password,
            confirmPassword: confirmPassword.confirmPassword,
            handle: handle.handle
        }
        async function postData() {
            return await axios.post('/signup', newUserData); 
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
        } else if (name === "confirmPassword"){
            setConfirmPassword({
                [name]: value
            });
        } else if (name === "handle"){
            setHandle({
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
                    Signup
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
                     <TextField 
                     id="confirmPassword" 
                     name="confirmPassword" 
                     type="password" 
                     label="confirm Password" 
                     className={classes.textField}
                     onChange={handleChange}
                     helperText={errors.errors ? errors.errors.confirmPassword : null} 
                     error={errors.errors.confirmPassword ? true : false}
                     value={confirmPassword.confirmPassword}  
                     fullWidth
                     />
                     <TextField 
                     id="handle" 
                     name="handle" 
                     type="text" 
                     label="Handle" 
                     className={classes.textField}
                     onChange={handleChange}
                     helperText={errors.errors ? errors.errors.handle : null} 
                     error={errors.errors.handle ? true : false}
                     value={handle.handle}  
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
                     Signup
                     {loading.loading && (
                         <CircularProgress size={30} className={classes.progress}/>
                     )}
                    </Button>
                    <br />
                    <br />
                    <small>Already have an account? login <Link to="/login">here</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default  withStyles(styles)(Signup);
