import { SIGN } from "./types.react";


let initialState = {
    isLoggedIn: false,
    userId: null,
    userType: null,
    avatar: {},
    name: null,
    secondName: null,
    jwt: "",
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
                avatar: action.payload.user.avatar,
                name: action.payload.user.name,
                secondName: action.payload.user.secondName,
                userId: action.payload.user.id
            };
        }
        default:
            return state;
    }
}

export default AuthReducer;