import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { SideContainer } from "./index";
import { Mapping } from "../mapping";

const PrivateRoute = ({component: Component, logged, withSide, ...rest}) => (
    <Route {...rest} render={(props) => (
        logged
            ? withSide
                ? <SideContainer mapping={Mapping}>
                    <Component {...props}/>
                </SideContainer>
                : <Component {...props}/>
            : <Redirect to="/login"/>
    )}/>
);

function mapStateToProps(state){
    return {
        logged: state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps)(PrivateRoute);