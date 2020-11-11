import React from 'react';
import styled from "styled-components";

export const Separator = styled.div`
    border-left: 1px solid ${props => props.theme.text.editorSecondary};
    margin: ${props => props.margin ? props.margin : "auto 32px"};
    height: 32px;
    width: 2px;
    @media (max-width: 768px){
        margin-left: 12px;
        margin-right: 12px;
    }
`;

export const Avatar = styled.img`
    height: 35px;
    width: 35px;
    border-radius: 50px;
    margin-left: 14px;
    object-fit: cover;
    border: 1px solid #DFE0EB;
`;

const OfflineTagWrapper = styled.div`
    margin: auto ${props=>props.mr ? props.mr : 0} auto ${props=>props.ml ? props.ml : 0};
    font-family: ${props=>props.theme.fontFamily};
    border: 1px solid ${props=>props.theme.colors.buttonDisable};
    padding: 2px 5px;
    font-size: 10px;
    color: ${props=>props.theme.text.secondarySecondary};
    font-weight: 600;
    border-radius: 4px;
`;

export const OfflineModLabel = ({ml, mr}) =>(
    <OfflineTagWrapper ml={ml} mr={mr}>
        offline
    </OfflineTagWrapper>
);