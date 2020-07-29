import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import MenuItem from "../MenuItem.react";
import {connect} from "react-redux";

class SimpleMenu extends React.Component{

    render(){

        const { mapping, location, userType } = this.props;

        return Object.keys(mapping).map((key, index)=>{

            if (mapping[key].exclude || (mapping[key].userType !== undefined && mapping[key].userType !== userType) ) {
                return null;
            }
            return(
                <React.Fragment key={index}>
                    <MenuItem to={key} title={mapping[key].title} icon={mapping[key].icon}
                              active={key === location.pathname} onClick={()=>this.setState({opened: false})}/>
                </React.Fragment>
            );
        });
    }
}

SimpleMenu.propTypes = {
    mapping: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        userType: state.auth.userType
    }
}

export default connect(mapStateToProps)(withRouter(SimpleMenu));