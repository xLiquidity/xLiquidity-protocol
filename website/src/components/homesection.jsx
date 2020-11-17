import React from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import home from '../images/home.svg'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      textAlign: 'center',
      padding: theme.spacing(20, 10, 20),
      color: '#131C46',
    },
    image: {
      borderRadius: 25,
      width: '100%',
    },
    button: {
      backgroundColor:'#fff',
    }
  }));

function HomeSection() {
    const classes = useStyles();
    return (

        <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid style={{margin: "auto"}} item md>
<h1>Ensuring optimal liquidity across crypto</h1>
<p>xLiquidity enables investors of any size to participate in the cryptocurrency market, regardless of exchange or protocol though efficient market making</p>        
<Button className={classes.button} href="https://github.com/Islandersfan2016/Liquidity-Protocol" variant="contained">
  View Code
</Button>
</Grid>
        <Grid item md>
        <img src={home} className={classes.image}/>
        </Grid>
      </Grid>
      </div>

    )
}

export default HomeSection;