import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import { withTheme } from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

import { DraftCard, Typography, Loaders } from '../../components';


class CardsView extends React.Component{

    constructor(props) {
        super(props);
        this.orderLines = this.orderLines.bind(this);
        this.fetchMoreBlocks = this.fetchMoreBlocks.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.state = {
            cards: null,
            hasMore: true,
            width: window.innerWidth
        }
    }

    orderLines(){
        const { drafts, theme, prefix, ...rest } = this.props;
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
                        <Flex my={theme.spacing.block}>
                            {
                                drafts.slice(i, i + sepCount).map((item, index)=>
                                    <React.Fragment key={index}>
                                        <Box width={1/sepCount} height="300px" >
                                            <DraftCard draft={item} linkPrefix={prefix} {...rest}/>
                                        </Box>
                                    </React.Fragment>
                                )
                            }
                        </Flex>
                    </React.Fragment>
                )
            }
        }else{
            items = drafts.map((item, index) => <React.Fragment key={index}>
                <Box width={"100%"} px={"5px"} mx="auto" mb={theme.spacing.block} height="300px">
                    <DraftCard draft={item} linkPrefix={prefix} {...rest}/>
                </Box>
            </React.Fragment>)
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

    fetchMoreBlocks (){
        const { fetchMore = () => null } = this.props;
        const hasMore = fetchMore();
        this.setState({hasMore});
    }

    render(){
        const { theme, drafts, emptyMessage, hasMore: globHasMore } = this.props;
        const { cards, hasMore = true } = this.state;
        const { AnimateGroup } = require('react-animation');

        if ( cards === null || drafts == null ){
            return (<Loaders.Text/>);
        }

        return (
            <>{
                drafts.length > 0
                    ?<>
                        <AnimateGroup durationOut={1000} animationIn={"bounceIn"} animationOut="fadeOut">
                            <InfiniteScroll dataLength={cards.length} next={this.fetchMoreBlocks}
                                            hasMore={globHasMore && hasMore}
                                            loader={<Loaders.Infinity done={!hasMore}/>}>
                                {cards}
                            </InfiniteScroll>
                        </AnimateGroup>
                        {
                            !hasMore && <Loaders.Infinity done={!hasMore}/>
                        }
                    </>
                    : <Typography.XXLarge margin="50px auto" textAlign="center" width="100%" color={theme.text.editorSecondary}>
                        { emptyMessage !== undefined ? emptyMessage : "Пока тут пусто" }
                    </Typography.XXLarge>
            }</>
        );
    }
}

CardsView.propTypes ={
    prefix: PropTypes.string.isRequired,
    drafts: PropTypes.array.isRequired,
    fetchMore: PropTypes.func,
    hasMore: PropTypes.bool,
    emptyMessage: PropTypes.string,
    skipState: PropTypes.bool,
    externalLink: PropTypes.bool,
    withTime: PropTypes.bool,
    withAuthor: PropTypes.bool,
    slug: PropTypes.bool
}


export default withTheme(CardsView);