import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';


const SimpleButton = styled.button`
    text-decoration: none;
    border-radius: 5px;
    display: inline-block;
    transition: all 0.4s ease 0s;
    outline: none;
    user-select: none;
    ${({inactive, outline, theme}) => inactive 
        ? `
            color: ${theme.text.buttonDisable};
            background: ${theme.colors.buttonDisable};
            border: 2px solid ${theme.colors.buttonDisable} !important;
        `
        : `
            cursor: pointer;
            color: ${outline? theme.colors.primary: "#ffffff"};
            background: ${outline ? "#ffffff" : theme.colors.primary};
            border: 2px solid ${theme.colors.primary} !important;
            :hover {
                color: ${outline ? "#ffffff" : theme.colors.primary};
                background: ${outline ? theme.colors.primary : "#ffffff"};
                border-color: ${theme.colors.primary} !important;
                transition: all 0.4s ease 0s;
            }
        `
    }
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
`;

class Simple extends React.Component{

    render(){

        const { onInactiveClick, inactive, onClick, ...rest } = this.props;

        return inactive
            ? <SimpleButton {...rest} onClick={onInactiveClick} inactive/>
            : <SimpleButton {...rest} onClick={onClick}/>
    }
}


Simple.propTypes = {
    inactive: PropTypes.bool,
    color: PropTypes.string,
    onClick: PropTypes.func,
    onInactiveClick: PropTypes.func,
    outline: PropTypes.bool,
    mini: PropTypes.bool
}

export default Simple;