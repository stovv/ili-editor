import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Flex, Box } from 'rebass';
import { connect } from "react-redux";
import { withTheme } from 'styled-components';

import { Lazy } from "./Images";
import { Small, XSmall } from './Typography.react';
//import { Icons } from '../../assets';
import { EmptyCover } from "../constants";
//import {createNewDraft, openDraft} from "../../store/smisolActions.react";
//import toaster from "toasted-notes";
//import { Toasts } from "../index";


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
        const { theme } = this.props;
        const { id, cover, title, rubric, updated_at } = this.props.draft;

        return (
            <Link to={`/edit/${id}`}>
                <Flex flexDirection={'column'} onClick={this.handleNewDraft}
                      height="100%" width="100%" maxWidth={["350px"]} mx="auto"
                      sx={{borderRadius: "6px", overflow: "hidden", cursor: "pointer",
                          transition: "all .3s ease-out",
                          boxShadow: "0px 0px 10px -5px rgba(0, 0, 0, 0.7)",
                          "&:hover": {
                              boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.7)",
                              transform: "translateY(-3px)"
                          }
                      }}>
                    <Box height={"70%"}>
                        <Lazy cover={cover || EmptyCover}/>
                    </Box>
                    <Box height={"30%"} bg={theme.colors.backgroundPrimary} p={"10px"}>
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
                        </Flex>
                    </Box>
                </Flex>
            </Link>
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
    draft: PropTypes.object.isRequired,
}

export default connect()(withTheme(DraftCard));