import React from 'react';
import styled from 'styled-components';

import { Small } from '../Typography.react';

const Container = styled.div`
    background-color: ${props => props.color};
    padding: 1rem;
    display: flex;
    margin: 20px 20px;
    -webkit-box-shadow: 0px 20px 24px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 20px 24px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 20px 24px -6px rgba(0,0,0,0.75);
    border-radius: 6px;
`;


class EmojiToast extends React.Component{
    constructor(props){
        super(props);
        this.onClose = props.onClose;
    }

    render(){
        return(
            <Container onClick={this.onClose} color={this.props.color ? this.props.color : "#000000"}>
                <Small weight={400} color={this.props.textColor ? this.props.textColor : '#ffffff'}
                       margin={"0"} textTransform={"none"}>
                    {this.props.children}
                </Small>
            </Container>
        );
    }
}

export default EmojiToast;