import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Flex, Box } from 'rebass';
import { connect } from "react-redux";
import styled, { withTheme } from 'styled-components';

import { Lazy } from "./Images";
import { Small, XSmall } from './Typography.react';
//import { Icons } from '../../assets';
import { EmptyCover } from "../constants";
//import {createNewDraft, openDraft} from "../../store/smisolActions.react";
//import toaster from "toasted-notes";
//import { Toasts } from "../index";


const Tag = styled.div`
    background-color: ${props => props.color};
    padding: 5px 10px;
    border-radius: 16px;
`;


class DraftCard extends React.Component {

    constructor(props) {
        super(props);
        this.handleNewDraft = this.handleNewDraft.bind(this);
        this.handleRemoveDraft = this.handleRemoveDraft.bind(this);
    }

    handleNewDraft(){
        const { draft, dispatch } = this.props;
        // dispatch(openDraft(draft.id))
        //     .then(()=>{
        //         Router.push("/smisl/create");
        //     });
    }

    handleRemoveDraft(){
        // toaster.notify(({ onClose }) => (
        //         <Toasts.Emoji onClose={onClose}>
        //             Удаление пока не работает
        //         </Toasts.Emoji>
        //     ), { position: "bottom-left"}
        // );
    }

    render() {
        const { theme, linkPrefix } = this.props;
        const { id, cover, title, rubric, updated_at, state } = this.props.draft;

        //state === "moderation"

        return (
                <Flex flexDirection={'column'} onClick={this.handleNewDraft}
                      height="100%" width="100%" maxWidth={["350px"]} mx="auto"
                      sx={{borderRadius: "15px", overflow: "hidden", cursor: "pointer",
                          boxShadow: "0px 0px 10px -5px rgba(0, 0, 0, 0.7)",
                          transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0s",
                          "&:hover": {
                              boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.7)",
                              transform: "translateY(-3px)"
                          }
                      }}>
                    <Box height={"70%"}>
                        <Link to={`${linkPrefix}${id}`}>
                            <Lazy cover={cover || EmptyCover}/>
                        </Link>
                    </Box>
                    <Box height={"30%"} bg={theme.colors.backgroundPrimary} p={"10px"}>
                        <Link to={`${linkPrefix}${id}`}>
                        {
                            rubric &&
                            <XSmall weight={500} color={theme.text.hover} textTransform="lowercase"
                                    margin={`${theme.spacing.xs} 0`}>
                                {rubric.title}
                            </XSmall>
                        }
                        <Small maxWidth={["240px"]} margin="0" hideOwerflow maxLines={2} weight={500}
                               color={(title && title.length > 0)
                                   ? theme.text.secondarySecondary
                                   : theme.text.secondary}>
                            { (title && title.length > 0)
                                ? title
                                : "Без заголовка"
                            }
                        </Small>
                        <Flex justifyContent={"space-between"} mt={"5px"}>
                            <XSmall color={theme.text.editorSecondary} margin={0}>
                                <Moment fromNow locale="ru">{updated_at}</Moment>
                            </XSmall>
                            {
                                state === 'moderation' &&
                                <Tag color={theme.colors.yellow}>
                                    <XSmall color={theme.text.onPrimary} margin={0}>
                                        На модерации
                                    </XSmall>
                                </Tag>
                            }
                        </Flex>
                        </Link>
                    </Box>
                </Flex>

        );
    }
}

// <Box bg={theme.colors.primary} width="30px" height="30px"
//      sx={{
//          borderRadius: "50%",
//          position: "absolute",
//          padding: "6px 10px",
//          top: "-5px",
//          right: "-5px"
//      }} onClick={this.handleRemoveDraft}>
//     <Icons.CloseIcon width="10px" height="10px"/>
// </Box>

DraftCard.propTypes = {
    linkPrefix: PropTypes.string.isRequired,
    draft: PropTypes.object.isRequired,
}

export default connect()(withTheme(DraftCard));