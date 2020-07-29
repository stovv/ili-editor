import { DRAFT, MODERATION, POSTS } from '../store/redactor/types.react';
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

export function getDraftsOnModeration(start, limit){
    return async dispatch => {
        await Redactor.getModerationDrafts()
            .then(response=>{
                console.log(response.data);
                dispatch(getModerationAction(response.data));
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

export function draftToPost(postId, draftId, data){
    return async dispatch => {
        await Redactor.updatePost(postId, data)
            .then(response=>{
                Redactor.removeDraft(draftId)
                    .then(response=>{
                        window.location.href=`/post/${postId}`;
                        dispatch(closeDraftAction);
                    })
            });
    };
}


export function postToDraft(post_id){
    return async dispatch => {
        await Public.getPost(post_id)
            .then(async post_response=>{
                console.log("POST RESP", post_response);
                await Redactor.createDraft()
                    .then(async draft_response=>{
                        console.log("DRAFT RESP", draft_response);
                        let draft_data = {
                            title: post_response.data.post.title,
                            blocks: post_response.data.post.blocks,
                            description: post_response.data.post.description,
                            event_date: post_response.data.post.event_date,
                            old_authors: post_response.data.post.old_authors,
                            authors: post_response.data.post.authors,
                            rubric: post_response.data.post.rubric.id,
                            cover: post_response.data.post.cover.id,
                            exists_post_id: post_id
                        };
                        console.log("NEW DRAFT DATA", draft_data);
                        await Redactor.updateDraft(draft_response.data.id, draft_data)
                            .then(response=>{
                                dispatch(openDraftAction(response.data));
                            })
                            .catch(reason=>{
                                console.log("REASON", reason);
                            });
                    })
                    .catch(reason=>{
                        console.log("REASON", reason);
                    })
            })
            .catch(reason => {console.log("REASON", reason);})
    };
}


export function closeDraft(){
    return async dispatch =>{
        dispatch(closeDraftAction);
    }
}