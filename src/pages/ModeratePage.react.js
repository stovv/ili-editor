import React from 'react';
import { connect } from "react-redux";

import { Redactor } from '../actions';
import { Views } from '../components';


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
            <Views.CardsView prefix="/moderate/draft/" drafts={moderation} skipState emptyMessage={"Пока нет ни одного черновика на модерации"}/>
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