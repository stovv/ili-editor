import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import { withTheme } from "styled-components";

import { DraftCard, Typography, Loader } from '../../components';


class CardsView extends React.Component{

    constructor(props) {
        super(props);
        this.orderLines = this.orderLines.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.state = {
            cards: null,
            width: window.innerWidth,
        }
    }

    orderLines(){
        const { drafts, theme, prefix, skipState } = this.props;
        const { width } = this.state;

        if ( drafts == null ){
            return
        }

        let items = [];
        let sepCount = 3;

        if (width < 1380 && width > 740) sepCount=2;
        else if (width < 740) sepCount=1;
        if (sepCount > 1){
            for (let i = 0; i < drafts.length; i+= sepCount) {
                items.push(
                    <React.Fragment key={i}>
                        <Flex mb={theme.spacing.block}>
                            {
                                drafts.slice(i, i + sepCount).map((item, index)=>
                                    <React.Fragment key={index}>
                                        <Box width={1/sepCount} height="250px" >
                                            <DraftCard draft={item} linkPrefix={prefix} skipState={skipState}/>
                                        </Box>
                                    </React.Fragment>
                                )
                            }
                        </Flex>
                    </React.Fragment>
                )
            }
        }else{
            drafts.map((item, index) => {
                items.push(
                    <React.Fragment key={index}>
                        <Box width={"100%"} px={"5px"} mx="auto" mb={theme.spacing.block} height="250px">
                            <DraftCard draft={item} linkPrefix={prefix} skipState={skipState}/>
                        </Box>
                    </React.Fragment>
                );
            })
        }
        this.setState({ cards: items });
    }

    handleWindowResize (){
        this.setState({ width: window.innerWidth });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.width !== this.state.width){
            this.orderLines();
        }
        if (prevProps.drafts !== this.props.drafts){
            this.orderLines();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    render(){
        const { theme, drafts, emptyMessage } = this.props;
        const { cards } = this.state;
        const { AnimateGroup } = require('react-animation');

        if ( cards === null || drafts == null ){
            return (<Loader/>);
        }
        // TODO: infinity scroll

        return (
            <Box>
                {
                    drafts.length > 0
                        ? <AnimateGroup durationOut={1000} animationIn={"bounceIn"} animationOut="fadeOut">{cards}</AnimateGroup>
                        : <Typography.XXLarge margin="50px auto" textAlign="center" width="100%" color={theme.text.editorSecondary}>
                            { emptyMessage !== undefined ? emptyMessage : "Пока тут пусто" }
                        </Typography.XXLarge>
                }
            </Box>
        );
    }
}

CardsView.propTypes ={
    prefix: PropTypes.string.isRequired,
    drafts: PropTypes.array.isRequired,
    emptyMessage: PropTypes.string,
    skipState: PropTypes.bool
}


export default withTheme(CardsView);