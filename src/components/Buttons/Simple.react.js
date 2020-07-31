import styled from 'styled-components';

const SimpleButton = styled.button`
    color: ${props => props.outline ? props.theme.colors.primary: "#ffffff"};
    text-decoration: none;
    background: ${props => props.outline ? "#ffffff" : props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary} !important;
    border-radius: 5px;
    display: inline-block;
    transition: all 0.4s ease 0s;
    outline: none;
    cursor: pointer;
    
    ${({mini}) => mini
        ? `
        height: 100%;
        padding: 8px 5px;
        margin: auto 0;
        `
        : `
        padding: 10px;
        width: 100%;
        text-transform: uppercase;
        `
    }
    
    :hover {
        color: ${props => props.outline ? "#ffffff" : props.theme.colors.primary};
        background: ${props => props.outline ? props.theme.colors.primary : "#ffffff"};
        border-color: ${props => props.theme.colors.primary} !important;
        transition: all 0.4s ease 0s;
    }
`;

export default SimpleButton;