import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Vaults from "./Vaults";
import VaultDetails from "./VaultDetails";
import Create from "./Create";
import Dashboard from "./Dashboard";
import Manage from "./Manage";
import VaultStrategyDetails from "./VaultStrategyDetails";

const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>

                <Route exact path="/manage">
                    <Manage />
                </Route>

                <Route exact path="/create">
                    <Create />
                </Route>

                <Route exact path="/vaults">
                    <Vaults />
                </Route>

                <Route path="/vaults/:symbol/strategy/:name/">
                    <VaultStrategyDetails />
                </Route>

                <Route path="/vaults/:symbol">
                    <VaultDetails />
                </Route>

                <Redirect to="/dashboard" />
            </Switch>
        </>
    );
};

export default Routes;
