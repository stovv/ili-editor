import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import { withRouter } from "react-router-dom";
import styled, { withTheme } from "styled-components";

import Header from './Header.react';
import { Logo } from '../assets';
import { Small } from './Typography.react';
import { Separator } from "./Common.react";
import { Redactor } from "../actions";
import MenuItem from "./MenuItem.react";


const RedactorLogo=({theme})=>(
    <Flex justifyContent="center" my={"30px"}>
        <Box my={"auto"} width={"40px"} height={"40px"}>
                <Logo width="100%" primary={theme.colors.primary}
                      background={theme.colors.secondary}/>
        </Box>
        <Box my={"auto"}>
            <Separator margin="0 10px"/>
        </Box>
        <Small margin="auto 0" color={theme.text.onPrimary}>Редактор</Small>
    </Flex>
);

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100%;
    height: 100%;
    display: ${props => props.opened ? "unset": "none"};
    background-color: rgba(0,0,0,.50);
    z-index: 900
`;


class SideContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
        this.handleWindowResize = this.handleWindowResize.bind(this);
    }
    handleWindowResize (){
        this.forceUpdate();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    render(){
        const { children, exclude, location, theme, mapping, title, sideComponent } = this.props;
        const { opened } = this.state;

        if (exclude !== undefined && exclude.includes(location.pathname)){
            return children;
        }
        return (
            <>
            <Flex height={"100%"} >
                <Box minWidth="255px" bg={"rgb(55, 58, 71)"} height={"100vh"} sx={{ zIndex: 999,
                    position: window.innerWidth > 1080 ? "sticky" : "fixed", top: 0,
                    left: window.innerWidth > 1080 ? 0 : (opened ? 0 : "-260px"),
                    transition: "left .2s ease",
                    boxShadow: window.innerWidth > 1080 ? "unset" : "52px -6px 59px -51px rgba(0,0,0,0.55)"
                }}>
                    <RedactorLogo theme={theme}/>
                    <Box mt={"50px"}/>
                    {
                        sideComponent !== undefined && sideComponent
                    }
                    {
                        mapping !== undefined &&
                         Object.keys(mapping).map((key, index)=>{

                             if ((exclude !== undefined && exclude.includes(location.pathname)) || mapping[key] === undefined) {
                                 return null;
                             }
                             return(
                                 <React.Fragment key={index}>
                                     <MenuItem to={key} title={mapping[key].title} active={key === location.pathname} onClick={()=>this.setState({opened: false})}/>
                                 </React.Fragment>
                             );
                         })
                    }
                </Box>
                <Box width={"100%"}>
                    <Header title={ mapping[location.pathname] !== undefined
                            ? mapping[location.pathname].title
                            : ( title !== undefined ? title : undefined )}
                            hamburgerClick={()=>this.setState({opened: true})}
                            hideName={window.innerWidth < 740}
                    />
                    {children}
                </Box>
            </Flex>
            {
                window.innerWidth <= 1080 &&
                <Overlay onClick={()=>this.setState({opened: false})} opened={opened}/>
            }
            </>
        );
    }
}

SideContainer.propTypes = {
    exclude: PropTypes.arrayOf(PropTypes.string),
    mapping: PropTypes.object
}

export default withRouter(withTheme(SideContainer));