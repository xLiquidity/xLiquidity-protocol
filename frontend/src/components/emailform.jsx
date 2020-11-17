import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        emailValue: '',
    };
  }

    render() {
        
        return (
                <form action="https://gmail.us2.list-manage.com/subscribe/post" method="POST" noValidate>
                  <input type="hidden" name="u" value="1e64b7b416ad6a29704b846ae"/>
                <input type="hidden" name="id" value="53036f9526"/>
                    
                    <TextField id="outlined-basic" label="Email" variant="outlined" 
                        type="email" 
                        name="EMAIL" 
                        id="MERGE0"
                        value={this.state.emailValue} 
                        onChange={ (e)=>{this.setState({emailValue: e.target.value});} } 
                        autoCapitalize="off" 
                        autoCorrect="off"
                     /> <br/>
                
                  <Button style={{margin:'10px', backgroundColor:'#fff'}} variant="contained" type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe">
                  Submit</Button>

                <div style={{position: 'absolute', left: '-5000px'}} aria-hidden='true' aria-label="Please leave the following three fields empty">
                    <label htmlFor="b_name">Name: </label>
                    <input type="text" name="b_name" tabIndex="-1" value="" placeholder="Freddie" id="b_name"/>

                    <label htmlFor="b_email">Email: </label>
                    <input type="email" name="b_email" tabIndex="-1" value="" placeholder="youremail@gmail.com" id="b_email"/>

                    <label htmlFor="b_comment">Comment: </label>
                    <textarea name="b_comment" tabIndex="-1" placeholder="Please comment" id="b_comment"></textarea>
                </div>
              </form>
        )
    }
}

export default EmailForm