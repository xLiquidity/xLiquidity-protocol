import React from "react";
import styled from "styled-components";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import Logo from './logo';

function NavBar() {
 
    return (
<AppBar>
<StyledTopBarInner><StyledLogoWrapper><Logo/></StyledLogoWrapper><h2>xLiquidity</h2>
        <Tabs>
          <Tab label='Github' href='https://github.com/Islandersfan2016/Liquidity-Protocol' />
          </Tabs>
        </StyledTopBarInner>
      </AppBar>
        )}

        const StyledLogoWrapper = styled.div`
        ${'' /* width: 260px; */}
        @media (max-width: 400px) {
          width: auto;
        }
      `;
      const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: 70px;
  justify-content: space-between;

  background-color:#5B90AD;
`;

export default NavBar;