import { SIGN } from "./types.react";


let initialState = {
    isLoggedIn: false,
    userId: null,
    jwt: "",
    ip: ""
};


function AuthReducer(state = initialState, action){
    switch (action.type) {
        case SIGN.OUT:{
            return {
                ...state,
                isLoggedIn: false,
                jwt: "",
                userId: null
            };
        }
        case SIGN.IN:{
            return {
                ...state,
                isLoggedIn: true,
                jwt: action.payload.jwt,
                userType: action.payload.user.role.id,
                userId: action.payload.user.id
            };
        }
        default:
            return state;
    }
}

export default AuthReducer;