import React, {ReactDOM} from "react";
import { connect } from 'react-redux';
import { Flex, Box } from 'rebass';
import toaster from "toasted-notes";
import EditorJS from "react-editor-js";
import { FilePond } from 'react-filepond'
import { Textarea } from '@rebass/forms';
import DatePicker from "react-datepicker";
import { withRouter } from 'react-router-dom';


import Tools from './tools';
import InitialData from './initialData';
import { Redactor } from "../../actions";
import { Redactor as RedactorAPI } from '../../api';
import IliThemeProvider from "../../theme";
import { RedactorTypogrphy } from './styles';
import { getJwt } from "../../api/connector.react";
import { BACKEND_URL, FilePondLocalization } from "../../constants";
import { Headers, Loader, Typography, PopUp, Buttons, Toasts, ListBox, Forms, InputsBox } from '../../components';


class EditPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            files: null,
            label: null,
            description: "",
            eventDate: new Date(),
            publishDate: new Date(),
            isModeration: this.props.match.url.includes('moderate'),
            isPost: this.props.match.url.includes('post')
        }
        this.autoSave = this.autoSave.bind(this);
        this.sendDraftTo = this.sendDraftTo.bind(this);
        this.editorInstance = undefined;
        props.dispatch(Redactor.clearTemp());
        props.dispatch(Redactor.closeDraft());
        props.dispatch(Redactor.openPopUp(null))
    }

    componentDidMount() {
        const { isPost } = this.state;
        const { dispatch, match } = this.props;

        const action = ()=>{
            let files = [];
            if ( this.props.draft.cover !== null ){
                files.push(`${BACKEND_URL}${this.props.draft.cover.url}`);
                dispatch(Redactor.addTempData('draftCover', this.props.draft.cover))
            }
            this.setState({
                loading: false,
                files,
                label: (this.props.draft && this.props.draft.title != null && this.props.draft.title.length > 0 )
                    ? this.props.draft.title
                    : null,
                description: (this.props.draft && this.props.draft.description != null && this.props.draft.description.length > 0 )
                    ? this.props.draft.description
                    : null,
                eventDate: this.props.draft && this.props.draft.eventDate !== null ? new Date(this.props.draft.eventDate) : new Date(),
                publishDate: this.props.draft && (
                    this.state.isPost
                        ? this.props.draft && this.props.draft.publish_at !== null ? new Date(this.props.draft.publish_at) : new Date()
                        : this.props.draft && this.props.draft.publishDate !== null ? new Date(this.props.draft.publishDate) : new Date()
                ),
            });
        };

        if ( isPost ){
            dispatch(Redactor.openPost(match.params.id))
                .then(()=>action());
        }else{
            dispatch(Redactor.openDraft(match.params.id))
                .then(()=>action());
        }

        this.autoSave();
    }

    autoSave(){
        const { dispatch, editorState, stateMapping, match } = this.props;
        const { isPost, label } = this.state;

        setTimeout(function () {
            if (this.editorInstance !== undefined &&
                typeof this.editorInstance.save !== "undefined" && editorState === stateMapping.IN_SAVE){

                if ( isPost ){
                    this.editorInstance.save()
                        .then(outputData => {
                            dispatch(Redactor.updatePost(match.params.id, { blocks: outputData }))
                                .then(()=>{
                                    if ( this.props.editorState === stateMapping.IN_SAVE )
                                        dispatch(Redactor.setRedactorSaved());
                                });
                        })
                        .catch(reason=>{
                            console.log('Error saving:', reason);
                            dispatch(Redactor.setRedactorSaveError());
                        });
                    dispatch(Redactor.updatePost(match.params.id, { title: label }))
                        .then(()=>{
                            if ( this.props.editorState === stateMapping.IN_SAVE )
                                dispatch(Redactor.setRedactorSaved());
                        });
                }else{
                    this.editorInstance.save()
                        .then(outputData => {
                            dispatch(Redactor.updateDraft(match.params.id, { blocks: outputData }))
                                .then(()=>{
                                    if ( this.props.editorState === stateMapping.IN_SAVE )
                                        dispatch(Redactor.setRedactorSaved());
                                });
                        })
                        .catch(reason=>{
                            console.log('Error saving:', reason);
                            dispatch(Redactor.setRedactorSaveError());
                        });
                    dispatch(Redactor.updateDraft(match.params.id, { title: label }))
                        .then(()=>{
                            if ( this.props.editorState === stateMapping.IN_SAVE )
                                dispatch(Redactor.setRedactorSaved());
                        });
                }

            }
            this.autoSave();
        }.bind(this), 3000);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.loading !== nextState.loading
            || this.props.tmpCover !== nextProps.tmpCover
            || this.state.files !== nextProps.files
            || this.props.tmpRubric !== nextProps.tmpRubric
            || this.state.eventDate !== nextState.eventDate
            || this.props.tmpUser !== nextProps.tmpUser
            || this.props.tmpAuthors !== nextProps.tmpAuthors;
    }

    async sendDraftTo(to){
        const { match, dispatch, tmpCover, tmpRubric, tmpUser, tmpAuthors, draft, history } = this.props;
        const { description, eventDate, publishDate } = this.state;

        this.setState({loading: true});

        let nData = {};
        if ( (draft.cover !== null && tmpCover.id !== draft.cover.id) || draft.cover === null ){
            nData.cover = tmpCover.id;
        }

        if ( (draft.rubric !== null && tmpRubric.id !== draft.rubric.id) || draft.rubric === null ){
            nData.rubric = tmpRubric.id;
            if(tmpRubric.withEventDate){
                nData.isEvent = true;
                nData.eventDate = eventDate;
            }
        }else if (draft.rubric.withEventDate)  {
            nData.isEvent = true;
            nData.eventDate = eventDate;
        }

        if ( tmpUser !== undefined ){
            await RedactorAPI.createUser(tmpUser.name, tmpUser.secondName, 15)
                .then(response=>{
                    console.log(response.data);
                    if ( tmpAuthors !== undefined ){
                        nData.authors = [
                            ...tmpAuthors.map(author=>author.id),
                            response.data.user.id
                        ]
                    }else{
                        nData.authors = [
                            ...draft.authors.map(author=>author.id),
                            response.data.user.id
                        ]
                    }
                })
        }else if ( tmpAuthors !== undefined ){
            nData.authors = tmpAuthors.map(author=>author.id)
        }

        console.log(nData.authors);

        if ( to === "publication" ){
            nData.publishDate = publishDate;
        }
        nData.description = description;
        if ( to !== null ){
            nData.state = to;
            dispatch(Redactor.updateDraft(match.params.id, nData)).then(()=>{
                dispatch(Redactor.clearTemp());
                dispatch(Redactor.closeDraft());
                history.push('/');
            });
        }else{
            dispatch(Redactor.updatePost(match.params.id, nData)).then(()=>{
                dispatch(Redactor.clearTemp());
                dispatch(Redactor.closeDraft());
                history.push('/');
            });
        }
    }

    render() {
        const { loading, files, isModeration, isPost } = this.state;
        const { dispatch, tmpCover, tmpRubric, tmpUser, tmpAuthors } = this.props;
        const { blocks } = this.props.draft;

        if ( loading ){
            return <IliThemeProvider><Loader/></IliThemeProvider>
        }

        const alreadyAuthorsExists = !(tmpAuthors !== undefined && tmpAuthors.length === 0);
        const newAuthorExists = !(tmpUser === undefined || Object.keys(tmpUser).length < 2 || Object.keys(tmpUser).some(key => tmpUser[key].length === 0))
        return (
            <>
                <RedactorTypogrphy/>
                <IliThemeProvider>
                    <Headers.Editor typeHeader={isModeration ? "moderation"  : ( isPost ? "post" : undefined) }/>
                    <PopUp pid={1} title={
                        isModeration || isPost
                          ? "Прежде чем опубликовать"
                          : "Прежде чем отправить на модерацию"

                    }>
                        <Box my={"30px"}>
                            <Typography.Small weight={400}>{
                                isModeration || isPost
                                  ? "1. Удтвердите или поменяйте обложку"
                                  : "1. Выберете обложку"
                            }</Typography.Small>
                            <FilePond
                                ref={ref => (this.pond = ref)}
                                files={files}
                                allowMultiple={false}
                                server={{
                                    revert: null,
                                    fetch: (url, load, error, progress, abort, headers) => {
                                        let request = new XMLHttpRequest();
                                        request.open("GET", url, true);
                                        request.responseType = "blob";

                                        request.onload = function(oEvent) {
                                            if (request.status >= 200 && request.status < 300) {
                                                // the load method accepts either a string (id) or an object
                                                load(request.response);
                                            }
                                            else {
                                                // Can call the error method if something is wrong, should exit after
                                                error('oh no');
                                            }
                                        };
                                        request.send();

                                        return {
                                            abort: () => {
                                                // User tapped abort, cancel our ongoing actions here

                                                // Let FilePond know the request has been cancelled
                                                abort();
                                            }
                                        };
                                    },
                                    process:(fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                                        if ((tmpCover !== undefined && tmpCover.name === file.name) ||
                                            (this.props.draft.cover !== null && `${this.props.draft.cover.hash}${this.props.draft.cover.ext}` === file.name)) {
                                            load("Already loaded");
                                            return;
                                        }
                                        const formData = new FormData();
                                        formData.append(fieldName, file, file.name);

                                        const request = new XMLHttpRequest();
                                        request.open('POST', `${BACKEND_URL}/upload`);
                                        request.setRequestHeader('Authorization', `Bearer ${getJwt()}`);

                                        request.upload.onprogress = (e) => {
                                            progress(e.lengthComputable, e.loaded, e.total);
                                        };

                                        request.onload = function() {
                                            if (request.status >= 200 && request.status < 300) {
                                                // the load method accepts either a string (id) or an object
                                                load(request.responseText);
                                                dispatch(Redactor.addTempData('draftCover', JSON.parse(request.response)[0]))
                                            }
                                            else {
                                                // Can call the error method if something is wrong, should exit after
                                                error('oh no');
                                            }
                                        };
                                        request.send(formData);

                                        return {
                                            abort: () => {
                                                request.abort();
                                                abort();
                                            }
                                        };
                                    }
                                }}
                                onupdatefiles={fileItems => {
                                    // Set currently active file objects to this.state
                                    this.setState({
                                        files: fileItems.map(fileItem => fileItem.file)
                                    });
                                }}
                                onremovefile={(error, file)=>{
                                    dispatch(Redactor.addTempData('draftCover', undefined))
                                    this.setState({
                                        files: []
                                    });
                                }}
                                name="files"
                                {...FilePondLocalization}
                            />
                        </Box>
                        <Flex justifyContent={"space-between"}>
                            <Box width={1/5}/>
                            <Box width={1/5}>
                                <Buttons.Simple inactive={tmpCover === null || tmpCover === undefined}
                                                onClick={()=>dispatch(Redactor.openPopUp(2))}
                                                onInactiveClick={() => {
                                                    toaster.notify(({ onClose }) => (
                                                            <Toasts.WithEmoji onClose={onClose}>
                                                                ⚠ Обложка статьи не выбрана
                                                            </Toasts.WithEmoji>
                                                        ), { position: "bottom-right"}
                                                    );
                                                }}>Дальше</Buttons.Simple>
                            </Box>
                        </Flex>
                    </PopUp>
                    <PopUp pid={2} title={
                        isModeration || isPost
                            ? "Прежде чем опубликовать"
                            : "Прежде чем отправить на модерацию"

                    }>
                        <Box my={"30px"}>
                            <Typography.Small weight={400}>{
                                isModeration || isPost
                                    ? "2. Удтверите или поменяйте рубрику"
                                    : "2. Выберете рубрику"
                            }</Typography.Small>
                            <ListBox listType={"rubric"} initialValue={this.props.draft.rubric ? this.props.draft.rubric: undefined}/>
                        </Box>
                        <Box mb={"30px"}>
                            <Typography.Small weight={400}>{
                                isModeration || isPost
                                ? "3. Проверьте краткое описание"
                                : "3. Кратко опишите"
                            }</Typography.Small>
                            <Textarea
                                value={this.state.description}
                                sx={{
                                    border: "1px solid #cfcfd3",
                                    borderRadius: "4px",
                                    minHeight: "120px"
                            }} onChange={(e)=>this.setState({description: e.target.value})}/>
                        </Box>
                        {
                            (tmpRubric !== undefined && tmpRubric !== null && tmpRubric.withEventDate)
                                && <Box mb={"30px"}>
                                    <Typography.Small weight={400}>{
                                        isModeration || isPost
                                            ? "4. Проверьте дату события"
                                            : "4. Добавьте дату события"
                                    }</Typography.Small>
                                    <DatePicker
                                        selected={this.state.eventDate}
                                        onChange={date => this.setState({
                                            eventDate: date
                                        })}
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy H:mm"
                                        showTimeInput
                                    />
                                </Box>
                        }

                        <Flex justifyContent={"space-between"}>
                            <Box width={1/5}/>
                            <Box width={1/5}>
                                <Buttons.Simple inactive={(this.state.description === null ||
                                this.state.description.length < 10) ||
                                (tmpRubric === undefined || tmpRubric === null)}
                                                onClick={()=>{dispatch(Redactor.openPopUp(3))}}
                                                onInactiveClick={() => {
                                                    toaster.notify(({ onClose }) => (
                                                            <Toasts.WithEmoji onClose={onClose}>
                                                                ⚠ Не все поля заполнены
                                                            </Toasts.WithEmoji>
                                                        ), { position: "bottom-right"}
                                                    );
                                                }}>Дальше</Buttons.Simple>
                            </Box>
                        </Flex>
                    </PopUp>
                    <PopUp pid={3} title={
                        isModeration || isPost
                            ? "Прежде чем опубликовать"
                            : "Прежде чем отправить на модерацию"

                    }>
                        <Box my={"30px"}>
                            <Typography.Small weight={400}>{
                                isModeration || isPost
                                    ? "Проверьте авторов"
                                    : "Можно добавить автора"
                            }</Typography.Small>
                            {
                                (!isModeration && !isPost) &&
                                <Typography.XSmall weight={400}>Например если вы отредактировали/добавили пост написанный не вами</Typography.XSmall>
                            }
                            <ListBox listType={"authors"} initialValue={this.props.draft.authors}/>
                            <Typography.Small margin="20px 0" weight={400}>Не нашли автора? создайте нового!</Typography.Small>
                            <InputsBox inputType={"newUser"}/>
                        </Box>
                        <Flex justifyContent={"space-between"}>
                            <Box width={1/5}/>
                            <Box width={1/5}>
                                <Buttons.Simple
                                    inactive={!alreadyAuthorsExists && !newAuthorExists}
                                    onInactiveClick={() => {
                                        toaster.notify(({ onClose }) => (
                                                <Toasts.WithEmoji onClose={onClose}>
                                                    {
                                                        (!alreadyAuthorsExists && !newAuthorExists)
                                                            && "⚠ Введите хотябы одного автора"
                                                    }
                                                </Toasts.WithEmoji>
                                            ), { position: "bottom-right"}
                                        );
                                    }}
                                    onClick={()=>{
                                        if (isModeration){
                                            dispatch(Redactor.openPopUp(4))
                                        }else{
                                            this.sendDraftTo(isPost ? null : "moderation")
                                        }}}>
                                    {isModeration ? "Дальше" : "Отправить"}
                                </Buttons.Simple>
                            </Box>
                        </Flex>
                    </PopUp>
                    <PopUp pid={4} title={
                        isModeration || isPost
                            ? "Прежде чем опубликовать"
                            : "Прежде чем отправить на модерацию"

                    }>
                        <Box my={"30px"}>
                            <Typography.Small weight={400}>Когда запланировать публикацию?</Typography.Small>
                            <DatePicker
                                selected={this.state.publishDate}
                                onChange={date => this.setState({
                                    publishDate: date
                                })}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy H:mm"
                                showTimeInput
                            />
                        </Box>
                        <Flex justifyContent={"space-between"}>
                            <Box width={1/5}/>
                            <Box width={1/5}>
                                <Buttons.Simple onClick={()=>this.sendDraftTo("publication")}>Отправить</Buttons.Simple>
                            </Box>
                        </Flex>
                    </PopUp>
                    <Box width="100%" mx="auto" maxWidth={"1000px"} px={"20px"}>
                        <Forms.Inputs.TitleArea fixed placeholder="Заголовок" defaultValue={this.state.label}
                                    onChange={(event) => {
                                        dispatch(Redactor.setRedactorInSave());
                                        this.setState({ label: event.target.value })
                                    }}/>
                    </Box>
                </IliThemeProvider>
                <div style={{
                    padding: "0 20px"
                }}>
                    <EditorJS
                        //enableReInitialize={true}
                        instanceRef={instance => this.editorInstance = instance}
                        tools={Tools}
                        hideToolbar={false}
                        data={(blocks === null || Object.keys(blocks).length === 0) ? InitialData : blocks}
                        onChange={()=>{dispatch(Redactor.setRedactorInSave())}}
                    />
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        stateMapping: state.redactor.editorStateMapping,
        editorState: state.redactor.editorState,
        draft: state.redactor.draft,
        tmpCover: state.redactor.tmp.draftCover,
        tmpRubric: state.redactor.tmp.rubric,
        tmpUser: state.redactor.tmp.newUser,
        tmpAuthors: state.redactor.tmp.authors
    }
}

export default connect(mapStateToProps)(withRouter(EditPage));