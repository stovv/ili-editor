import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({component: Component, logged, ...rest}) => (
    <Route {...rest} render={(props) => (
        logged
            ? <Component {...props} />
            : <Redirect to="/login"/>
    )}/>
);

function mapStateToProps(state){
    return {
        logged: state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps)(PrivateRoute);