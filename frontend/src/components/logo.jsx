import React from "react";
import styled from "styled-components";
import logo from '../images/logo.png';

function Logo() {
    return (
      <StyledLogo>
        <a href='/'><img src={logo} height="50" style={{ marginTop: 4 }} /></a>
      </StyledLogo>
    )
  }

  const StyledLogo = styled.span`
align-items: center;
display: flex;
justify-content: center;
margin: 0;
min-height: 100px;
min-width: 100px;
padding: 0;
text-decoration: none;
`
export default Logo