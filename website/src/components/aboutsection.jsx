import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Tractor from '../images/tractor.svg';
import Flash from '../images/flash.svg';
import Swap from '../images/swap.svg';
import Design from '../images/design.svg'

import SimpleCard from './card';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      textAlign: 'center',
      padding: theme.spacing(10, 10, 20),
      color: '#131C46',
    },
    image: {
      borderRadius: 25,
      width: '50%',
      marginTop: 25,
      marginBottom: 100,
    },
  }));

function AboutSection() {
    const classes = useStyles();
    ;
    return (

        <div className={classes.root}>
        <h1>Overview of xLiquidity</h1>
        <img src={Design} className={classes.image}/>
        <h1>Benefits of xLiquidity</h1>
      <Grid container spacing={10}>
      <Grid item xs>
<SimpleCard
  aboutImage={Swap}
  aboutTitle={'Efficient Markets'}
  aboutContent={'Ensure assets are "priced right" across exchanges'}
/>
</Grid>
<Grid item xs>
<SimpleCard
  aboutImage={Flash}
  aboutTitle={'Flash Loans'}
  aboutContent={'Enable and benefit from arbitrage flash loans'}
/>
</Grid>
<Grid item xs>
<SimpleCard
  aboutImage={Tractor}
  aboutTitle={'Yield Farming'}
  aboutContent={'Deposit digital currency in vaults to gain yield'}
/>
</Grid>
      </Grid>
      
      </div>

    )
}

export default AboutSection;