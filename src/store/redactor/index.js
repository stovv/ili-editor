import {DRAFT, MODERATION, POSTS, STATE} from "./types.react";

let initialState = {
    draft: {},
    drafts: [],
    moderation: [],
    published: [],
    posts: [],
    editorState: null,
    editorStateMapping: STATE
}

function RedactorReducer(state = initialState, action){
    switch (action.type) {
        case DRAFT.GET:{
            return {
                ...state,
                draft: {},
                editorState: null,
                drafts: action.payload
            };
        }
        case MODERATION.GET:{
            return {
                ...state,
                draft: {},
                moderation: action.payload
            };
        }
        case POSTS.GET_MY:{
          return  {
              ...state,
              published: action.payload
          };
        }
        case POSTS.GET_ALL:{
            return {
                ...state,
                posts: action.payload
            }
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
                draft: {}
            };
        }
        case STATE.IN_SAVE:{
            return{
                ...state,
                editorState: STATE.IN_SAVE
            }
        }
        case STATE.SAVED:{
            return{
                ...state,
                editorState: STATE.SAVED
            }
        }
        case STATE.SAVE_ERROR:{
            return{
                ...state,
                editorState: STATE.SAVE_ERROR
            }
        }
        default:
            return state;
    }
}

export default RedactorReducer;