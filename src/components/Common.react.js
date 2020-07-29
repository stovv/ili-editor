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