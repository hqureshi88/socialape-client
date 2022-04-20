import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Screams from '../Functions/Scream';

async function getData() {
    return await axios.get('/screams');
}

function Home (){
    const [screams, setScreams] = useState([]);
    useEffect(() => {
        let data = getData();
            data.then((res) => {
                // console.log(res.data);
                setScreams(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    let recentScreamsMarkup = screams ? (screams.map((scream) => <Screams scream={scream} key={scream.screamId}/>)) : (<p>Loading...</p>);

    // console.log(screams);
    // console.log(recentScreamsMarkup);
    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <p>Profile...</p>
            </Grid>
        </Grid> 
    )
}

export default Home;
