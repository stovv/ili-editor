import React from 'react';
import { Flex, Box } from 'rebass';

import { Redactor } from '../actions';
import { DraftCard, Typography, Loader } from '../components';
import { connect } from "react-redux";
import {withTheme} from "styled-components";


class DraftsPage extends React.Component{

    constructor(props) {
        super(props);
        this.orderLines = this.orderLines.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.state = {
            drafts: null,
            width: window.innerWidth,
        }
    }


    orderLines(){
        const { drafts, theme } = this.props;
        const { width } = this.state;
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
                                            <DraftCard draft={item}/>
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
                            <DraftCard draft={item}/>
                        </Box>
                    </React.Fragment>
                );
            })
        }
        this.setState({ drafts: items });
    }

    handleWindowResize (){
        this.setState({ width: window.innerWidth });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
        const { userId, dispatch } = this.props;
        dispatch(Redactor.getDrafts(userId)).then(this.orderLines());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.width !== this.state.width){
            this.orderLines();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    render(){
        const { theme } = this.props;
        const { drafts } = this.state;
        const { AnimateGroup } = require('react-animation');
        return (
            <Box>
                {
                    drafts === null
                        ? <Loader/>
                        : <>
                            {
                                drafts.length > 0
                                    ? <AnimateGroup durationOut={1000} animationIn={"bounceIn"} animationOut="fadeOut">{drafts}</AnimateGroup>
                                    : <Typography.XXLarge margin="50px auto" textAlign="center" width="100%" color={theme.text.editorSecondary}>
                                        Пока нет ни одного черновика
                                    </Typography.XXLarge>
                            }
                        </>

                }
            </Box>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.auth.userId,
        drafts: state.redactor.drafts
    }
}

export default connect(mapStateToProps)(withTheme(DraftsPage));