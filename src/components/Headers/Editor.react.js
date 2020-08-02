import React from "react";
import {Flex, Box } from 'rebass';
import { connect } from "react-redux";
import { withTheme } from "styled-components";

import { BACKEND_URL } from "../../constants";
import { Logo } from "../../assets";
import { Separator, Avatar } from "../Common.react";
import SimpleButton from "../Buttons/Simple.react";
import { XSmall } from "../Typography.react";
import {Redactor} from "../../actions";
import {STATE} from "../../store/redactor/types.react";


const RedactorLogo=({theme, typeHeader})=>(
    <Flex justifyContent="center" my={"auto"}>
        <Box my={"auto"} width={"50px"} height={"50px"}>
            <Logo width="100%" primary={theme.colors.primary}
                  background={theme.colors.secondary}/>
        </Box>
        <Box my={"auto"}>
            <Separator margin="0 10px"/>
        </Box>
        <XSmall margin="auto 0" color={theme.text.secondary}>{
            typeHeader === "moderation"
                ? "Редактура"
                : (
                    typeHeader === "post"
                        ? "Статья"
                        : "Черновик"
                )
        }</XSmall>
    </Flex>
);


class EditorHeader extends React.Component {
    render(){
        const { theme, avatar, editorState, stateMapping, dispatch, typeHeader } = this.props;

        let stateMessage = "";
        if ( editorState !== null ){
            switch (editorState){
                case stateMapping.IN_SAVE:{
                    stateMessage = "Сохраняем..."
                    break
                }
                case stateMapping.SAVED:{
                    stateMessage = "Сохранено"
                    break
                }
                case stateMapping.SAVE_ERROR:{
                    stateMessage = "Не сохранено"
                    break
                }
                default:{
                    stateMessage = "";
                    break;
                }
            }
        }

        return (
            <Flex mb={"54px"} mt={"30px"} justifyContent={"space-between"}
                  mx={"auto"} maxWidth={"1000px"} px={"20px"}>
                <Box my={"auto"}>
                    <Flex>
                        <RedactorLogo theme={theme} typeHeader={typeHeader}/>
                    </Flex>
                </Box>
                <Box my={"auto"}>
                    <Flex>
                        {
                            editorState !== null &&
                                <XSmall color={stateMessage === "Не сохранено" ? theme.text.hover : theme.text.secondary}
                                        margin="auto 20px auto 0">
                                    {stateMessage}
                                </XSmall>
                        }
                        {
                            typeHeader === "moderation"
                                ? <SimpleButton mini onClick={()=>{dispatch(Redactor.openPopUp(1))}}>
                                    Опубликовать
                                 </SimpleButton>
                                : (
                                    typeHeader === "post"
                                      ? <SimpleButton mini onClick={()=>{dispatch(Redactor.openPopUp(1))}}>
                                            Обновить
                                        </SimpleButton>
                                      : <SimpleButton mini onClick={()=>{dispatch(Redactor.openPopUp(1))}}>
                                            На модерацию
                                        </SimpleButton>
                                  )
                        }
                        {
                            avatar !== undefined &&
                            <Box my={"auto"}>
                                <Avatar src={`${BACKEND_URL}${avatar.formats.thumbnail.url}`}/>
                            </Box>
                        }
                    </Flex>
                </Box>
            </Flex>
        );
    }
}

function mapStateToProps(state) {
    return {
        avatar: state.auth.avatar,
        stateMapping: state.redactor.editorStateMapping,
        editorState: state.redactor.editorState
    }
}

export default connect(mapStateToProps)(withTheme(EditorHeader));