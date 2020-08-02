import api, {getJwt} from "../connector.react";

export async function uploadFile(file){
    const jwt = getJwt();

    const formData = new FormData();
    formData.append('files', file);

    return api.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${jwt}`
        },
    })
}

export async function uploadFileByUrl(url){
    const jwt = getJwt();

    return api.get(`fetcher/fetchImage?url=${url}&jwt=${jwt}`);
}


export async function uploadByFormData(formData){
    const jwt = getJwt();
    return api.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${jwt}`
        },
    })
}

export async function getExternalImage(imageUrl, imageName) {

    const resp = await fetch(imageUrl);
    if ( resp.ok ){
        console.log("OK");
        const mimeType = resp.headers.get('content-type');
        console.log(resp);
        return new File([resp.blob()], imageName, { type: mimeType });
    }else{
        console.log(resp)
        console.log("ERROR GETTING DATA", resp.statusText)
    }

    // const response = await api.simple_get(imageUrl, {
    //     responseType: 'blob',
    //     crossdomain: true,
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //     }
    // }).catch(reason => console.log("ERROR GETTING DATA", reason));

    // const mimeType = response.headers['content-type'];
    // return new File([response.data], imageName, { type: mimeType });
}