import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import logo from '../images/logo.png'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      textAlign: 'center',
      padding: theme.spacing(20, 10, 1),
      backgroundColor: '#5B90AD',
      color: '#fff',
    },
    copyright: {
      padding: theme.spacing(3, 0, 0),
    },
  }));

function Footer() {
    const classes = useStyles();
    const year = new Date().getFullYear();
    return (

        <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item md>
<h1>Expand the frontiers of defi</h1>
<p>xLiquidity is a protocol that allows you to passively put your crypto to use</p>
</Grid>
<Grid item md>
        <img src={logo} width="30%" />
        </Grid>
      </Grid>
      <p className={classes.copyright}>Copyright ⓒ {year}</p>
      </div>

    )
}

export default Footer;