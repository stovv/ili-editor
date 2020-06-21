import React, { useState } from 'react';
import PropTypes from "prop-types";
import styled, {withTheme} from 'styled-components';

import { Flex } from 'rebass';
import { ClipLoader } from 'react-spinners';


export const Simple = styled.button`
    color: ${props => props.outline ? props.theme.colors.primary: "#ffffff"};
    text-transform: uppercase;
    text-decoration: none;
    background: ${props => props.outline ? "#ffffff" : props.theme.colors.primary};
    padding: 10px;
    border: 2px solid ${props => props.theme.colors.primary} !important;
    border-radius: 5px;
    display: inline-block;
    transition: all 0.4s ease;
    width: 100%;
    cursor: ${props=> props.notHoverable ? "default": "pointer"};
    outline: none;
    :hover {
        ${props => !props.notHoverable && `
            color: ${props.outline ? "#ffffff" : props.theme.colors.primary};
            background: ${props.outline ? props.theme.colors.primary : "#ffffff"};
            border-color: ${props.theme.colors.primary} !important;
        `}
    }
    
`;

class WithLoading extends React.Component {
    render(){
        const { component, children, loading, theme, size, onClick, ...props } = this.props;

        const Component = component;
        return (
            <Component {...props} notHoverable={loading} onClick={loading ? undefined : onClick}>
                <Flex justifyContent="center" >
                    {
                        loading
                            ? <ClipLoader size={size ? size : undefined} color={theme.text.onPrimary}/>
                            : children
                    }
                </Flex>
            </Component>
        )
    }

}

export const Loading = withTheme(WithLoading);

const defProps = {
    color: PropTypes.string,
    outline: PropTypes.string
}

Simple.propTypes = defProps;