import api from "../connector.react";

export async function getPost(id){
    return api.ql(`
    query{
      post(id:${id}){
        rubric{
          id,
          slug,
          title,
          infinityScroll,
          cover,
          withEventDate
        },
        event_date,
        title,
        description,
        publish_at,
        authors(limit: 4){
          id,
          name,
          secondName
        },
        cover{
          id,
          caption, 
          alternativeText,
          url,
          width,
          mime,
          height,
          formats
        },
        blocks,
        comment_thread{
            id
        },
        rating{
          id,
          likes,
          dislikes,
          views
        },
        updated_at
      }
    }
    
    `);
}


export async function randomUnsplashImage(){
    return api.simple_get(`https://source.unsplash.com/1600x900/?write`)
}