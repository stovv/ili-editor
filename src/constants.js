export const BACKEND_URL = process.env.SITE_ROOT ||  'https://xpan.ili-nnov.ru';
export const SITE_URL = process.env.SITE_ROOT || 'http://localhost:3000';

export const Mapping = {
    '/': {
        title: 'Moи черновики'
    },
    '/moderate': {
        title: 'В редактуре',
        userType: 5
    }
}


export const EmptyCover = {
    "url": "/uploads/kelly-sikkema-Gps_U7uErEg-unsplash_8d9f46ec74.jpeg",
    "mime": "image/jpeg",
    "width": 3000,
    "height": 2115,
    "formats": {
        "large": {
            "ext": ".jpeg",
            "url": "/uploads/large_kelly-sikkema-Gps_U7uErEg-unsplash_8d9f46ec74.jpeg",
            "hash": "large_kelly-sikkema-Gps_U7uErEg-unsplash_8d9f46ec74",
            "mime": "image/jpeg",
            "path": null,
            "size": 43.99,
            "width": 1000,
            "height": 705
        },
        "small": {
            "ext": ".jpeg",
            "url": "/uploads/small_kelly-sikkema-Gps_U7uErEg-unsplash_8d9f46ec74.jpeg",
            "hash": "small_kelly-sikkema-Gps_U7uErEg-unsplash_8d9f46ec74",
            "mime": "image/jpeg",
            "path": null,
            "size": 11.88,
            "width": 500,
            "height": 353
        },
        "medium": {
            "ext": ".jpeg",
            "url": "/uploads/medium_kelly-sikkema-Gps_U7uErEg-unsplash_8d9f46ec74.jpeg",
            "hash": "medium_kelly-sikkema-Gps_U7uErEg-unsplash_8d9f46ec74",
            "mime": "image/jpeg",
            "path": null,
            "size": 23.95,
            "width": 750,
            "height": 529
        },
        "thumbnail": {
            "ext": ".jpeg",
            "url": "/uploads/thumbnail_kelly-sikkema-Gps_U7uErEg-unsplash_8d9f46ec74.jpeg",
            "hash": "thumbnail_kelly-sikkema-Gps_U7uErEg-unsplash_8d9f46ec74",
            "mime": "image/jpeg",
            "path": null,
            "size": 3.57,
            "width": 221,
            "height": 156
        }
    }
}