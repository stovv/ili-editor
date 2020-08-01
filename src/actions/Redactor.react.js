import { DRAFT, MODERATION, POPUP, POSTS, STATE, TEMP, DATA } from '../store/redactor/types.react';
import { Redactor, Auth, Public } from '../api';


const getDraftAction = (data) => {
    return {
        type: DRAFT.GET,
        payload: data
    };
};

const getModerationAction = (data) => {
    return {
        type: MODERATION.GET,
        payload: data
    };
};

const getAllPostsAction = (data) => {
    return {
        type: POSTS.GET_ALL,
        payload: data
    };
};

const getPublishedAction = (data) => {
    return {
        type: POSTS.GET_MY,
        payload: data
    };
};

const openDraftAction = (data) =>{
    return {
        type: DRAFT.OPEN,
        payload: data
    };
};

const updateDraftAction = (data) =>{
    return {
        type: DRAFT.UPDATE,
        payload: data
    };
};

const getRubricsAction = (data) =>{
    return {
        type: DATA.GET.RUBRICS,
        payload: data
    };
};


const closeDraftAction = {
    type: DRAFT.CLOSE,
    payload: null
};


export function getDrafts(){
    return async dispatch => {
        await Redactor.getDrafts()
            .then(response=>{
                dispatch(getDraftAction(response.data));
            })
            .catch(reason=>{
                console.log(reason);
            })
    };
}

export function getDraftsOnModeration(){
    return async dispatch => {
        await Redactor.getModerationDrafts()
            .then(response=>{
                dispatch(getModerationAction(response.data));
            })
            .catch(reason=>{
                console.log(reason);
            })
    };
}

export function getAllPosts(start, limit){
    return async dispatch => {
        await Redactor.getAllPosts(start, limit)
            .then(response=>{
                dispatch(getAllPostsAction(response.data.posts));
            })
            .catch(reason=>{
                console.log(reason);
            })
    };
}

export function getRubrics(){
    return async dispatch => {
        await Public.getRubrics()
            .then(response=>{
                dispatch(getRubricsAction(response.data));
            })
            .catch(reason=>{
                console.log(reason);
            })
    };
}


export function getPublishedPosts(user_id, start, limit){
    return async dispatch => {
        await Redactor.getMyPosts(user_id, start, limit)
            .then(response=>{
                dispatch(getPublishedAction(response.data.posts));
            })
            .catch(reason=>{
                console.log(reason);
            })
    };
}

export function createNewDraft(){
    return async dispatch => {
        await Redactor.createDraft()
            .then(response=>{
                dispatch(openDraftAction(response.data));
            });
    };
}

export function openDraft(draftId){
    return async dispatch => {
        await Redactor.getDraft(draftId)
            .then(response=>{
                dispatch(openDraftAction(response.data));
            });
    };
}

export function updateDraft(draftId, data){
    return async dispatch => {
        await Redactor.updateDraft(draftId, data)
            .then(response=>{
                dispatch(updateDraftAction(response.data));
            });
    };
}

export function closeDraft(){
    return async dispatch =>{
        dispatch(closeDraftAction);
    }
}

export function setRedactorInSave(){
    return async dispatch =>{
        dispatch({
            type: STATE.IN_SAVE,
            payload: null
        })
    }
}

export function setRedactorSaved(){
    return async dispatch =>{
        dispatch({
            type: STATE.SAVED,
            payload: null
        })
    }
}

export function setRedactorSaveError(){
    return async dispatch =>{
        dispatch({
            type: STATE.SAVE_ERROR,
            payload: null
        })
    }
}

export function openPopUp(pid){
    return async dispatch =>{
        dispatch({
            type: POPUP.OPEN,
            payload: pid
        })
    }
}

export function closePopUp(){
    return async dispatch =>{
        dispatch({
            type: POPUP.CLOSE,
            payload: null
        })
    }
}

export function addTempData(key, value){
    return async dispatch =>{
        dispatch({
            type: TEMP.ADD,
            payload: {
                [key]: value
            }
        })
    }
}

export function clearTemp(){
    return async dispatch =>{
        dispatch({
            type: TEMP.CLEAR,
            payload: null
        })
    }
}