import styled from 'styled-components';
import PropTypes from 'prop-types';


const SimpleImage = styled.div`
    ${ ({withLoading, error, errorSrc, loading, loadingSrc, actualSrc, url}) => withLoading 
        ? `background: url(${error ? errorSrc : (loading ? loadingSrc : actualSrc)}) center no-repeat`
        : `
           background: url(${url}) center no-repeat
        `
    };
    background-size: ${props => props.bgSize ? props.bgSize : 'cover'};
    cursor: ${props=> props.hover && 'pointer'};
    width: ${props=> props.width ? props.width : '100%'};
    height: ${props=> props.height ? props.height : '100%'};
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
`;


SimpleImage.propTypes = {
    hover: PropTypes.bool,
    withLoading: PropTypes.bool,
    url: PropTypes.string,
    transform: PropTypes.string,
    overflow: PropTypes.string,
    bgSize: PropTypes.string,
    blackout: PropTypes.bool,
    zIndex: PropTypes.number,
    float: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    maxWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    maxHeight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    children: PropTypes.node,
}

export default SimpleImage;
