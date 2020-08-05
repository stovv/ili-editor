import React from 'react';
import { Box } from "rebass";
import PropTypes from 'prop-types';
import styled, {withTheme} from 'styled-components';

import { XXLarge } from "../../Typography.react";
import { TitleArea } from "../../Forms/Inputs.react";


const QuoteBox = styled.div`
  margin: ${props => (props.screenWidth && props.screenWidth > 1023) ? '10px 0' : '5px 18px 5px 14px'};
  padding: ${props => (props.screenWidth && props.screenWidth > 1023) ? '8px 0 8px 10px' : '6px 0 6px 4px'}; ;
  border-left: solid 5px ${props => props.theme.colors.primary};
`;


class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            text: props.data ? props.data.text: "",
        }
    }

    render(){
        const { data, theme } = this.props;

        if (data.type === "1"){
            return (
                <QuoteBox screenWidth={window.innerWidth}>
                    <TitleArea onChange={event => {this.setState({text: event.target.value })}}
                               defaultValue={this.state.text} dryStart defaultHeight={data.height}
                               withoutLabel fontSizeIndex={3}
                               placeholder={"Бабки для меня не главное. \nПоэтому я им и не уступаю"}
                    />
                </QuoteBox>
            );
        }else if (data.type === "2"){
            return (
                <Box my="10px">
                    <XXLarge type="xxlarge" textAlign="center" margin="0 0 23px 0">« »</XXLarge>
                    <Box>
                        <TitleArea onChange={event => {this.setState({text: event.target.value })}}
                                   defaultValue={this.state.text} dryStart defaultHeight={data.height}
                                   outline="#4a4a4a" withoutLabel fontSizeIndex={3} textStyle={"italic"}
                                   placeholder={"Цитата бип боп...."}  align={"center"}
                        />
                    </Box>
                </Box>
            );
        }else if (data.type === "3"){
            return (
                <Box my="10px">
                        <TitleArea onChange={event => {this.setState({text: event.target.value })}}
                                   defaultValue={this.state.text} dryStart withoutLabel focusedOutline
                                   defaultHeight={this.props.data.height} fontSizeIndex={4}
                                   placeholder={"Просто начни...."} textStyle={"italic"} textWeight={"400"}
                                   outline={theme.colors.buttonDisable} textColor={theme.text.secondary} align={"center"}/>
                </Box>
            );
        }
        console.log("ERROR: invalid Quote type")
        return null
    }
}


Quote.propTypes = {
    input: PropTypes.bool,
    data: PropTypes.object,
}

export {
    Quote as QuoteInput
}

export default withTheme(Quote);