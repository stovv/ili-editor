import React, {ReactDOM} from "react";
import { connect } from 'react-redux';
import EditorJS from "react-editor-js";

import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Marker from "@editorjs/marker";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

import Tools from './tools';
import InitialData from './initialData';
import {Headers, Loader} from '../../components';
import IliThemeProvider from "../../theme";
import { RedactorTypogrphy } from './styles';
import {Redactor} from "../../actions";


class EditPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        this.autoSave = this.autoSave.bind(this);
        this.editorInstance = undefined;
    }

    componentDidMount() {
        const { dispatch, match } = this.props;
        dispatch(Redactor.openDraft(match.params.id))
            .then(()=>{
                this.setState({ loading: false });
            });
        this.autoSave();
    }

    autoSave(){
        const { dispatch, editorState, stateMapping, match, draft } = this.props;

        setTimeout(function () {
            if (typeof this.editorInstance.save !== "undefined" && editorState === stateMapping.IN_SAVE){
                this.editorInstance.save()
                    .then(outputData => {
                        dispatch(Redactor.updateDraft(match.params.id, {
                            blocks: outputData
                        })).then(()=>{
                            dispatch(Redactor.setRedactorSaved());
                        });
                    })
                    .catch(reason=>{
                        console.log('Error saving:', reason);
                        dispatch(Redactor.setRedactorSaveError());
                    })
                // dispatch(Redactor.updateDraft(match.id, {
                //         title: this.state.label
                //     }
                // )).then(response=>{
                //     dispatch(Redactor.setRedactorSaved());
                // })
                    // .catch(reason=>{
                    //     console.log("REASON", reason);
                    //     this.setState({in_save: false});
                    // })
            }
            this.autoSave();
        }.bind(this), 3000);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.loading !== nextState.loading;
    }

    render() {
        const { loading } = this.state;
        const { dispatch } = this.props;
        const { blocks } = this.props.draft;

        if ( loading ){
            return <IliThemeProvider><Loader/></IliThemeProvider>
        }

        return (
            <>
                <RedactorTypogrphy/>
                <IliThemeProvider>
                    <Headers.Editor/>
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
        draft: state.redactor.draft
    }
}

export default connect(mapStateToProps)(EditPage);