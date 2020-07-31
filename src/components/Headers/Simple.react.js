import React from "react";
import PropTypes from "prop-types";
import { Flex, Box } from 'rebass';
import { connect } from "react-redux";
import { withTheme } from "styled-components";

import { Typography } from '../index';
import { BACKEND_URL } from "../../constants";
import { Search, Hamburger } from "../../assets";
import { Separator, Avatar } from "../Common.react";


class SimpleHeader extends React.Component {
    render(){
        const { title, theme, hideName, hamburgerClick, avatar, name, secondName } = this.props;

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

SimpleHeader.propTypes = {
    title: PropTypes.string,
    hideName: PropTypes.bool,
    hamburgerClick: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        avatar: state.auth.avatar,
        name: state.auth.name,
        secondName: state.auth.secondName,
    }
}

export default connect(mapStateToProps)(withTheme(SimpleHeader));