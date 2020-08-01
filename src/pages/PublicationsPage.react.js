import React from 'react';
import { connect } from "react-redux";

import { Redactor } from '../actions';
import { Views } from '../components';


class PublicationsPage extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { userId, dispatch } = this.props;
        dispatch(Redactor.getPublishedPosts(userId, 0, 10));
    }

    render(){
        const { published } = this.props;

        return (
            <Views.CardsView prefix="https://dev.ili-nnov.ru/post/" externalLink drafts={published} emptyMessage={'Пока нет ни одной публикации'}/>
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