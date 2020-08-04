import React from 'react';
import { connect } from "react-redux";

import { Redactor } from '../actions';
import { Views } from '../components';


class AllPostsPage extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(Redactor.getAllPosts(0, 100));
    }

    render(){
        const { posts } = this.props;

        return (
            <Views.CardsView prefix="/edit/post/" withAuthor drafts={posts} emptyMessage={'Пока нет ни одного поста'}/>
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