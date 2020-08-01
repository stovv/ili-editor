import api, { getJwt } from "../connector.react";

export async function getDraft(id){
    const jwt = getJwt();
    return api.get(`/drafts/${id}`,{
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function getDrafts(){
    const jwt = getJwt();
    return api.get(`/drafts`,{
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function updateDraft(id, data){
    const jwt = getJwt();
    return api.put(`/drafts/${id}`,data,{
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function removeDraft(id){
    const jwt = getJwt();
    return api.delete(`/drafts/${id}`,{
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function updatePost(id, data){
    const jwt = getJwt();
    return api.put(`/posts/${id}`,data,{
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function createDraft(data){
    const jwt = getJwt();
    return api.post("/drafts",data,{
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function getModerationDrafts(){
    const jwt = getJwt();
    return api.get("/draftsOnModeration", {
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function getMyPosts(user_id, start, limit){
    return api.ql(`
    query{
      posts( where: { authors: { id: ${user_id} } }, start: ${start}, limit: ${limit} ){
        id,
        title,
        updated_at,
        publish_at,
        created_at,
        rubric {
            title
        },
        cover{
            url,
            mime,
            ext,
            name,
            width,
            height
            formats
        }
      }
    }
    `);
}

export async function getScheduledPosts(){
    const jwt = getJwt();
    return api.get('/draftsOnPublication', {
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function getAllPosts(start, limit){
    return api.ql(`
    query{
      posts( start: ${start}, limit: ${limit} ){
        id,
        title,
        rubric {
            title
        },
        updated_at,
        publish_at,
        created_at,
        cover{
            url,
            mime,
            ext,
            name,
            width,
            height
            formats
        }
      }
    }
    `);
}