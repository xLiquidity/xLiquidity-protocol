import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import contact from '../images/contact.svg'
import EmailForm from './emailform'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      textAlign: 'center',
      padding: theme.spacing(10, 10, 20),
      color: '#131C46',
    },
  }));

function ContactSection() {
    const classes = useStyles();
    return (
    <div className={classes.root}>
    <h1>Get notified on xLiquidity</h1>
      <Grid container spacing={10}>
        <Grid item md>
        <img src={contact} width="75%" />
        </Grid>
        <Grid style={{margin: "auto"}} item md>
<h2>Sign up for updates</h2>
<EmailForm/>
</Grid>
      </Grid>
      </div>


    )
}

export default ContactSection;