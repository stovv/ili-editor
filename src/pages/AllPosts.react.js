import React from 'react';
import { connect } from "react-redux";

import { Redactor } from '../actions';
import { Views } from '../components';
import {Redactor as RedactorAPI} from "../api";


class AllPostsPage extends React.Component{
    state = {
        postsCount: 0
    }
    componentDidMount() {
        const { dispatch } = this.props;
        RedactorAPI.getPostsCount()
            .then(response => {
                this.setState({
                    postsCount: response.data
                })
            })
            .catch(reason=>{

            });
        dispatch(Redactor.getAllPosts( 10));
    }

    render(){
        const { posts } = this.props;
        const { postsCount } = this.state;

        return (
            <Views.CardsView prefix="/edit/post/" withAuthor drafts={posts}
                             emptyMessage={'Пока нет ни одного поста'}
                             hasMore={postsCount > 0}
                             fetchMore={() => {
                                 this.props.dispatch(Redactor.getAllPosts(10));
                                 return postsCount > this.props.posts.length;
                             }}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.auth.userId,
        posts: state.redactor.posts
    }
}

export default connect(mapStateToProps)(AllPostsPage);