import React from 'react';
import styled from 'styled-components';

import { Small } from '../Typography.react';

const Container = styled.div`
    background-color: #000000;
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
            <Container onClick={this.onClose}>
                <Small weight={400} color={'#ffffff'} margin={"0"} textTransform={"none"}>
                    {this.props.children}
                </Small>
            </Container>
        );
    }
}

export default EmojiToast;