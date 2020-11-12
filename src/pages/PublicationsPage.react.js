import React from 'react';
import { connect } from "react-redux";

import { Redactor } from '../actions';
import { Views } from '../components';
import { Redactor as RedactorAPI } from "../api";


class PublicationsPage extends React.Component{
    state = {
        postsCount: 0
    }
    componentDidMount() {
        const { dispatch, userId } = this.props;
        RedactorAPI.getPostsCount(userId)
            .then(response => {
                this.setState({
                    postsCount: response.data
                })
            })
            .catch(reason=>{

            });
        dispatch(Redactor.getPublishedPosts(userId, 10));
    }

    render(){
        const { userId, published = []} = this.props;
        const { postsCount } = this.state;
        return (
            <Views.CardsView prefix="https://ili-nnov.ru/" slug externalLink
                             drafts={published} emptyMessage={'Пока нет ни одной публикации'}
                             hasMore={postsCount > 0}
                             fetchMore={() => {
                                 this.props.dispatch(Redactor.getPublishedPosts(userId, 10));
                                 return postsCount > this.props.published.length;
                             }}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.auth.userId,
        published: state.redactor.published
    }
}

export default connect(mapStateToProps)(PublicationsPage);