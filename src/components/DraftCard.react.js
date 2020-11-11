import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import toaster from "toasted-notes";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { FiUsers, FiUser } from "react-icons/fi";
import styled, { withTheme } from 'styled-components';

import { Lazy } from "./Images";
import { Toasts } from "./index";
import { EmptyCover } from "../constants";
import { Small, XSmall } from './Typography.react';


const Tag = styled.div`
    background-color: ${props => props.color};
    padding: 5px 10px;
    border-radius: 16px;
`;

const LinkComp = ({to, externalLink, children}) =>(
    externalLink
        ? <a target="_blank" href={to}>{children}</a>
        : <Link to={to}>{children}</Link>
)


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
        const { theme, linkPrefix, skipState, externalLink, withTime, withAuthor, slug: isSlug } = this.props;
        const { id, slug, cover, title, rubric, updated_at, state, publishDate, authors } = this.props.draft;

        let bottomContent = (
            <>
                <XSmall weight={500} textTransform="lowercase" margin={`${theme.spacing.xxs} 0`}
                        color={ (rubric && rubric.title.length > 0) ? theme.text.hover : theme.text.editorSecondary}>
                    { (rubric && rubric.title.length > 0)
                        ? rubric.title
                        : "Без рубрики"
                    }
                </XSmall>
                <Small maxWidth={["240px"]} margin="0 0 5px 0" hideOwerflow maxLines={2} weight={500}
                       color={(title && title.length > 0)
                           ? theme.text.secondarySecondary
                           : theme.text.secondary}>
                    { (title && title.length > 0)
                        ? title
                        : "Без заголовка"
                    }
                </Small>
                {
                    withAuthor &&
                    <IconContext.Provider value={{ color: theme.text.hover, size: "14px", style: { margin: "auto 5px auto 0" } }}>
                        {
                            authors.length > 1
                                ? <Flex>
                                    <FiUsers/>
                                    <XSmall color={theme.text.hover} margin={0}>
                                        {authors[0].name} {authors[0].secondName} и еще {authors.length - 1}
                                    </XSmall>
                                </Flex>
                                : <Flex>
                                    <FiUser />
                                    <XSmall color={theme.text.hover} margin={0}>
                                        {authors[0].name} {authors[0].secondName}
                                    </XSmall>
                                </Flex>
                        }
                    </IconContext.Provider>
                }
                <Flex justifyContent={"space-between"} my={"5px"}>
                    {
                        withTime
                            ? <XSmall color={theme.text.editorSecondary} margin={0}>
                                Будет опубликованно <Moment locale="ru" format="D MMM YYYY HH:mm" withTitle>{publishDate}</Moment>
                            </XSmall>
                            : <XSmall color={theme.text.editorSecondary} margin={0}>
                                <Moment fromNow locale="ru">{updated_at}</Moment>
                            </XSmall>
                    }
                    {
                        (state === 'moderation' && !skipState) &&
                        <Tag color={theme.colors.yellow}>
                            <XSmall color={theme.text.onPrimary} margin={0}>
                                На модерации
                            </XSmall>
                        </Tag>
                    }
                </Flex>
            </>
        );


        return (
                <Flex flexDirection={'column'}
                      height="100%" width="100%" maxWidth={["350px"]} mx="auto"
                      sx={{borderRadius: "15px", overflow: "hidden", cursor: "pointer",
                          boxShadow: "0px 0px 10px -5px rgba(0, 0, 0, 0.7)",
                          transition: "all 0.8s cubic-bezier(0.25, -0.02, 0, 1.01)",
                          "&:hover": {
                              boxShadow: "rgb(0 0 0 / 19%) 1px 4px 20px 9px",
                              transform: "translateY(-3px)"
                          }
                      }} onClick={()=>{
                        if (state === "moderation" && !skipState){
                            toaster.notify(({ onClose }) => (
                                    <Toasts.WithEmoji onClose={onClose}>
                                        👆 Черновик на модерации
                                    </Toasts.WithEmoji>
                                ), { position: "bottom-right"}
                            );
                        }
                    }}>
                    <Box height={"100%"} sx={{position: "relative"}}>
                        {
                            (state !== "moderation" || skipState)
                                ? <LinkComp to={`${linkPrefix}${isSlug ? slug : id }`} externalLink={externalLink} slug={slug}>
                                    <Lazy cover={cover || EmptyCover}/>
                                </LinkComp>
                                : <Lazy cover={cover || EmptyCover}/>
                        }
                        <Box height={"max-content"} width="100%" bg={theme.colors.backgroundPrimary} p={"10px 10px 0 10px"} sx={{
                            position: 'absolute', bottom: 0, left: 0
                        }}>
                            {
                                (state !== "moderation" || skipState)
                                    ? <LinkComp to={`${linkPrefix}${isSlug ? slug : id }`} externalLink={externalLink} slug={slug}>
                                        {bottomContent}
                                    </LinkComp>
                                    : bottomContent
                            }
                        </Box>
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
    skipState: PropTypes.bool,
    externalLink: PropTypes.bool,
    withTime: PropTypes.bool,
    withAuthor: PropTypes.bool,
    slug: PropTypes.bool
}

export default connect()(withTheme(DraftCard));