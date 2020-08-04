import React from 'react';
import { Box } from "rebass";
import PropTypes from 'prop-types';
import styled, {withTheme} from 'styled-components';

import { XXLarge } from "../../Typography.react";
import { TitleArea } from "../../Forms/Inputs.react";


const QuoteBox = styled.div`
  margin: ${props => (props.screenWidth && props.screenWidth > 1023) ? '40px 0' : '20px 18px 20px 14px'};
  padding: ${props => (props.screenWidth && props.screenWidth > 1023) ? '8px 0 8px 10px' : '6px 0 6px 4px'}; ;
  border-left: solid 5px ${props => props.theme.colors.primary};
`;


class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            text: props.data ? props.data.text: null
        }
    }

    render(){
        const { data } = this.props;

        if (data.type === "1"){
            return (
                <QuoteBox screenWidth={window.innerWidth}>
                    <TitleArea onChange={event => this.setState({text: event.target.value})}
                               defaultValue={this.state.text} dryStart
                               withoutLabel fontSizeIndex={3}
                    />
                </QuoteBox>
            );
        }else if (data.type === "2"){
            return (
                <Box mt="35px" mb="40px">
                    <XXLarge type="xxlarge" textAlign="center" margin="0 0 23px 0">« »</XXLarge>
                    <Box>
                        <TitleArea outline="#4a4a4a" onChange={event => this.setState({text: event.target.value})}
                                   defaultValue={this.state.text} dryStart
                                   withoutLabel fontSizeIndex={3}
                        />
                    </Box>
                </Box>
            );
        }
        console.log("ERR: invalid Quote type")
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