import React from 'react';
import { Simple } from '../Images';
import { getImageLink } from './tools';


const Lazy = ({cover, ...props }) => {
    const [isImageLoaded, setImageLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    var Thumb = ``;
    var Cover = ``
    if (typeof cover === "object"){
        Thumb = getImageLink(cover, 'thumbnail')['url'];
        Cover = getImageLink(cover)['url'];
    }else{
        Thumb = cover;
        Cover = cover;
    }

    React.useEffect(() => {
        const img = new Image();

        img.onload = () => setImageLoaded(true);
        img.onerror = () => setHasError(true);

        img.src = Cover;
    }, [Cover])

    return (
        <Simple
            external
            withLoading
            loadingSrc={Thumb}
            actualSrc={Cover}
            errorSrc={Thumb}
            loading={!isImageLoaded}
            error={hasError}
            {...props}
        />
    )
};

export default Lazy;