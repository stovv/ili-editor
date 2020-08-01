import api from "../connector.react";

export async function getPost(id){
    return api.get(`/posts/${id}`);
}

export async function getRubrics(){
    return api.get('/rubrics');
}

export async function randomUnsplashImage(){
    return api.simple_get(`https://source.unsplash.com/1600x900/?write`)
}