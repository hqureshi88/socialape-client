import * as React from 'react';
import withStyles from "@material-ui/styles/withStyles";
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import PropTypes from "prop-types";

//MUI stuff

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
// import { Fragment } from "react";

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

function Scream(props) {
    // const { classes, scream : { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount} } = props;
    dayjs.extend(relativeTime);
    let { classes, scream : { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } } = props;
  
    if(!body){
        body = "";
    }
    if (!createdAt){
        createdAt = "";
    } 
    if (!userImage){
        userImage = "";
    } 
    if (!userHandle){
        userHandle = "";
    } 
    if (!screamId){
        screamId = "";
    } 
    if (!likeCount){
        likeCount = "";
    } 
    if (!commentCount){
        commentCount = "";
    }

    return ( 
        <Card className={classes.card}>
            <CardMedia
            image={userImage}
            title="Profile image"
            className={classes.image}
            // component='img'
            />
            <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`user/${userHandle}`} color="primary"><>{userHandle}</></Typography>
                    <Typography variant="body2"color="textSecondary"><>{dayjs(createdAt).fromNow()}</></Typography>
                    <Typography variant="body1"><>{body}</></Typography>
            </CardContent>
        </Card>
    );
}

export default withStyles(styles)(Scream);
// export default Screams;
