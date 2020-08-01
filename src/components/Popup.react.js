import React from "react";
import { Box } from 'rebass';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Modal } from 'react-responsive-modal';
import { withTheme } from "styled-components";


import { Redactor } from "../actions";
import { Normal } from './Typography.react';


class PopUp extends React.Component{

    render(){
        const { pid, openedId, children, title, dispatch } = this.props;

        return (

            <Modal open={pid === openedId} onClose={()=>{
                dispatch(Redactor.closePopUp());
            }}>
                <Box minWidth={"600px"}>
                    <Normal>{title}</Normal>
                    {children}
                </Box>
            </Modal>
        );
    }
}

function mapStateToProps(state){
    return {
        openedId: state.redactor.popUpId
    }
}

PopUp.propTypes = {
    pid: PropTypes.number,
    title: PropTypes.string
}

export default connect(mapStateToProps)(withTheme(PopUp));