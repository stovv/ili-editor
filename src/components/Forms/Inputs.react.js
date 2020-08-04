import React from 'react';
import PropTypes from 'prop-types';
import {Flex, Box} from 'rebass';
import styled from 'styled-components';
import nextId from "react-id-generator";



const BlankInput = styled.textarea`
    font-family: ${props => props.theme.fontFamily};
    margin: 0;
    min-height: 50px;
    resize: none;
    height: ${props=> props.idealHeight};
    font-size: ${props=> props.fontSizeIndex ? (props.theme.fontSizes[props.fontSizeIndex] ? props.theme.fontSizes[props.fontSizeIndex] : props.theme.fontSizes[9]) : props.theme.fontSizes[9]};
    color: ${props => props.inverted ? props.theme.text.onPrimary : props.theme.text.primary };
    background-color: ${props => props.inverted ? 'transparent' : props.theme.colors.secondary};
    font-weight: 500;
    width: 100%;
    word-break: break-word;
    ${({outline}) => outline
    ? `
          border: 1px solid ${outline};
          border-radius: 5px;
          outline: ${outline};
        `
    : `
          border: none;
          outline: none;
        `
};
    padding-left: 15px;
    ::placeholder{
        -webkit-text-fill-color: rgba(55, 53, 47, 0.2);
    }
    ${({label, theme}) => label && `
        :focus{
            border-left: 3px solid ${theme.text.secondary};
        }
    `}
`;

const Label = styled.span`
    font-family: ${props => props.theme.fontFamily};
    margin: 0 25px 0 0;
    font-size: ${props=> props.theme.fontSizes[1]};
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.32;
    letter-spacing: normal;
`;


export class TitleArea extends React.Component {

    constructor(props) {
        super(props);
        const newLines = (props.defaultValue.match(/\n/g) || []).length;
        this.state={
            idealHeight: props.dryStart ? Math.ceil((props.defaultValue.length - newLines)/65*28) + newLines*28 : 28,
            lastScrollHeight: props.dryStart ? Math.ceil((props.defaultValue.length - newLines)/65*28) + newLines*28 : 28,
            focused: false
        }
        this.TextAreaRef = React.createRef();
        this.inputId = nextId();
    }

    componentDidMount() {
        this.forceUpdate();
    }

    render(){
        const { withoutLabel,inverted, fontSizeIndex, outline, dryStart} = this.props;
        const { focused } = this.state;


        if (this.TextAreaRef.current !== null && this.TextAreaRef.current.id === this.inputId && ( (focused && dryStart) || !dryStart ) ) {
            this.TextAreaRef.current.style.height = '0px'; // This creates an inline style
            let scrollHeight = this.TextAreaRef.current.scrollHeight;
            const style = window.getComputedStyle(this.TextAreaRef.current);
            this.TextAreaRef.current.removeAttribute('style'); // The inline style must be removed
            this.state.idealHeight = scrollHeight
        }

        return(
            <Flex>
                {
                    ! withoutLabel &&
                    <Box my="auto" sx={{
                        visibility: this.state.focused ? 'visible' : 'hidden'
                    }}>
                        <Label>Заголовок</Label>
                    </Box>
                }
                <BlankInput
                    ref={this.TextAreaRef}
                    id={this.inputId}
                    placeholder={this.props.placeholder}
                    value={this.props.defaultValue}
                    onChange={this.props.onChange}
                    idealHeight={this.state.idealHeight + 'px'}
                    onFocus={()=>this.setState({focused: true})}
                    onBlur={()=>this.setState({focused: false})}
                    label={!withoutLabel}
                    inverted={inverted}
                    fontSizeIndex={fontSizeIndex}
                    outline={outline}
                />
            </Flex>
        );
    }

}

TitleArea.propTypes = {
    withoutLabel: PropTypes.bool,
    inverted: PropTypes.bool,
    fontSizeIndex: PropTypes.number,
    dryStart: PropTypes.bool
}