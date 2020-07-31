import React from "react";
import { connect } from "react-redux";
import styled, { withTheme } from "styled-components";


const PopUpWrap = styled.div`

`;



class PopUp extends React.Component{

    render(){

        return null;
    }
}

function mapStateToProps(state){
    return {

    }
}

export default connect(mapStateToProps)(withTheme(PopUp));