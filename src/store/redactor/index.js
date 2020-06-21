import {DRAFT} from "./types.react";

let initialState = {
    draft: null,
    drafts: []
}

function RedactorReducer(state = initialState, action){
    switch (action.type) {
        case DRAFT.GET:{
            return {
                ...state,
                draft: null,
                drafts: action.payload
            };
        }
        case DRAFT.OPEN:{
            return {
                ...state,
                draft: action.payload
            };
        }
        case DRAFT.UPDATE:{
            return {
                ...state,
                draft: {
                    ...state.draft,
                    ...action.payload
                }
            };
        }
        // case SMISOL.COVER.SET_TEMP:{
        //     return {
        //         ...state,
        //         temp_cover: action.payload
        //     };
        // }
        case DRAFT.CLOSE:{
            return {
                ...state,
                draft: null
            };
        }
        default:
            return state;
    }
}

export default RedactorReducer;