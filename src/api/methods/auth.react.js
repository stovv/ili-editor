import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import api, { getJwt } from "../connector.react";
import { Auth as AuthActions } from "../../actions";


export async function login(user, password){
    return api.post('/auth/local', {
        identifier: user,
        password: password,
    });
}

export async function me(user_id){
    const jwt = getJwt();

    return api.ql(`
    query{
      user( id: ${user_id} ){
        id,
        name,
        secondName,
        avatar{
          formats
        }
      }
    }
    `, null,
    {
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function update_user(user_id, data){
    const jwt = getJwt();
    return api.put(`/users/${user_id}`, data, {
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function get_users(){
    const jwt = getJwt();
    return api.get(`/users`, {
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

class IsLogged extends React.Component{

    componentDidMount() {
        const { dispatch, history } = this.props;
        const jwt = getJwt();
        api.get('/users/me', {headers: {'Authorization': `Bearer ${jwt}`}})
            .then(response => console.log("Yeah! You already logged!"))
            .catch(reason => {
                console.log(reason)
                console.log("Something wrong with your jwt or backend -> ", reason);
                dispatch(AuthActions.logout());
                history.push('/login');
            });
    }

    render() {
        return null;
    }
}

export default connect()(withRouter(IsLogged));