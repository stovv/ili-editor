import { DRAFT, MODERATION, POSTS } from "./types.react";

let initialState = {
    draft: null,
    drafts: [],
    moderation: [],
    published: []
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
        case MODERATION.GET:{
            return {
                ...state,
                draft: null,
                moderation: action.payload
            };
        }
        case POSTS.GET_MY:{
          return  {
              ...state,
              published: action.payload
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