import React from 'react';
import { connect } from "react-redux";

import { Redactor } from '../actions';
import {Toasts, Views} from '../components';
import toaster from "toasted-notes";


class ModeratePage extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(Redactor.getDraftsOnModeration());
    }

    render(){
        const { moderation } = this.props;

        return (
            <Views.CardsView prefix="/moderate/draft/" drafts={moderation} skipState withAuthor emptyMessage={"Пока нет ни одного черновика на модерации"}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.auth.userId,
        moderation: state.redactor.moderation
    }
}

export default connect(mapStateToProps)(ModeratePage);