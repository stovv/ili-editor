import React from 'react';
import { connect } from "react-redux";

import { Redactor } from '../actions';
import { Views } from '../components';


class SchedulePage extends React.Component{
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(Redactor.getScheduledPosts());
    }

    render(){
        const { scheduled } = this.props;

        return (
            <Views.CardsView prefix="/moderate/draft/" drafts={scheduled} withTime
                             emptyMessage={'Пока нет ни одной запланированной публикации'}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        scheduled: state.redactor.scheduled
    }
}

export default connect(mapStateToProps)(SchedulePage);