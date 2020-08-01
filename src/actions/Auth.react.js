import {REDIRECT, SIGN} from "../store/auth/types.react";
import { Auth } from '../api';

function signInAction(data){
    return {
        type: SIGN.IN,
        payload: data
    };
}

const signOutAction = {
    type: SIGN.OUT
};


export function loginAction(loginData){
    return async dispatch => {
        dispatch(signOutAction);
        await Auth.login(loginData.login, loginData.password)
            .then(response=>{
                dispatch(signInAction(response.data));
            })
            .catch(reason=>{
                dispatch(signOutAction);
            })
    };
}

export function logout(){
    return async dispatch => {
        dispatch(signOutAction)
    }
}

export function cleanRedirect(){
    return async dispatch => {
        dispatch({
            type: REDIRECT.CLEAN
        })
    }
}

