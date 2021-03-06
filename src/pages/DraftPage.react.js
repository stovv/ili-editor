import React from 'react';
import { connect } from "react-redux";

import { Redactor } from '../actions';
import { Views } from '../components';


class DraftsPage extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { userId, dispatch } = this.props;
        dispatch(Redactor.getDrafts());
    }

    render(){
        const { drafts } = this.props;

        return (
            <Views.CardsView prefix="/edit/draft/" drafts={drafts} emptyMessage={'Пока нет ниодного черновика'}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.auth.userId,
        drafts: state.redactor.drafts
    }
}

export default connect(mapStateToProps)(DraftsPage);