import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import styled, { withTheme } from "styled-components";

import { Small } from './Typography.react';

const ActiveBar = styled.div`
    height: 100%;
    width: 3px;
    background-color: #DDE2FF;
    position: absolute;
    left: 0
`;

const MenuItem = ({ active, theme, icon, title, to, onClick }) =>{
    const Icon = icon;

    return(
        <Link to={to}>
            <Box onClick={onClick !== undefined ? onClick : undefined}
                 sx={{
                     position: 'relative',
                     cursor: 'pointer',
                     "&:hover": {
                         backgroundColor: "rgba(221, 226, 255, 0.08)"
                     }
                 }} height={"56px"}>
                {active && <ActiveBar/>}
                <Flex justifyContent={icon !== undefined ? undefined : "center"} my={"auto"} height={"100%"}>
                    {
                        icon !== undefined &&
                        <IconContext.Provider value={{ color: "white", size: "25px" }}>
                            <Box my={'auto'} mx={"20px"}>
                                <Icon/>
                            </Box>
                        </IconContext.Provider>
                    }
                    <Small margin="auto 0" textAlign={"center"} weight={500} color={theme.text.onPrimary}>{title}</Small>
                </Flex>
            </Box>
        </Link>
    );
};

MenuItem.propTypes = {
    active: PropTypes.bool,
    icon: PropTypes.node,
    title: PropTypes.string.isRequired,
}

export default withTheme(MenuItem);