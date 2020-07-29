import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { Flex, Box } from 'rebass';
import { withTheme } from "styled-components";

import { Auth } from '../api';
import { connect } from "react-redux";
import { Typography } from '../components';
import { BACKEND_URL } from "../constants";
import { Search, Hamburger } from "../assets";
import { Separator, Avatar } from "./Common.react";

class Header extends React.Component {

    state = {
        user: {}
    }

    componentDidMount() {
        const { userId } = this.props;
        Auth.me(userId)
            .then(response => {
                console.log(response);
                this.setState({ user: response.data.user});
            })
            .catch(res => console.log(res));
    }

    render(){
        const { title, theme, hideName, hamburgerClick } = this.props;
        const { avatar, name, secondName } = this.state.user;

        return (
            <Flex mb={"54px"} mt={"30px"} mx={window.innerWidth > 365 ? "30px" : "10px"} justifyContent={"space-between"}>
                <Box my={"auto"}>
                    <Flex>
                        {
                            (window.innerWidth <= 1080 && hamburgerClick !== undefined) &&
                            <Box onClick={hamburgerClick} sx={{cursor: 'pointer'}}>
                                <Hamburger/>
                            </Box>
                        }
                        {
                            window.innerWidth <= 365
                                ? <Typography.Small weight={600} margin="0 0 0 10px" color={theme.text.editorSecondary}>{title}</Typography.Small>
                                : <Typography.Normal weight={600} margin="0 0 0 20px" color={theme.text.editorSecondary}>{title}</Typography.Normal>

                        }
                    </Flex>
                </Box>
                <Box my={"auto"}>
                    <Flex>
                        <Box my={"auto"}>
                            <Search/>
                        </Box>
                        <Flex>
                        {
                            ( name !== undefined && secondName !== undefined && !hideName) &&
                            <>
                                <Separator/>
                                <Typography.XSmall weight={600} margin="auto 0" color={theme.text.editorSecondary}>
                                    {name} {secondName}
                                </Typography.XSmall>
                            </>
                        }
                        {
                            avatar !== undefined &&
                            <Box my={"auto"}>
                                <Avatar src={`${BACKEND_URL}${avatar.formats.thumbnail.url}`}/>
                            </Box>
                        }
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string,
    hideName: PropTypes.bool,
    hamburgerClick: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(withTheme(Header));