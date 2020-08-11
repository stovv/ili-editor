import api, { getJwt } from "../connector.react";

const { slugify } = require('transliter');
const passGenerator = require('generate-password');

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
        slug,
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
      posts( start: ${start}, limit: ${limit}, sort: "publish_at:DESC" ){
        id,
        title,
        rubric {
            title
        },
        updated_at,
        publish_at,
        created_at,
        authors{
            id,
            name,
            secondName
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

export async function getAllUsers(skipIds){
    const jwt = getJwt();
    return api.ql(`
    query {
      users(where: { id_nin: [${skipIds}] }){
        id,
        name,
        secondName
      }
    }
    `, null, {
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function createUser(name, secondName, roleId){
    const jwt = getJwt();
    let emailName = slugify(`${name}.${secondName}`, '_');
    return api.post('/auth/local/register', {
        "username": `${emailName}@ili-nnov.ru`,
        "email": `${emailName}@ili-nnov.ru`,
        "password": passGenerator.generate({
            length: 13,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true,
            excludeSimilarCharacters: true
        }),
        "confirmed": true,
        "role": roleId,
        "name": name,
        "secondName": secondName
    }, null, {
        headers: { 'Authorization': `Bearer ${jwt}`}
    })
}