import React from 'react';
import { connect } from "react-redux";
import { registerPlugin } from 'react-filepond';
import { Online } from "react-detect-offline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Mapping } from './mapping';
import IliThemeProvider from "./theme";
import IsLogged from './api/methods/auth.react';
import { EditPage, NotFoundPage } from './pages';
import { PrivateRoute, SideContainer} from "./components";

import './App.css';
import 'moment/locale/ru';
import 'filepond/dist/filepond.min.css';
import 'react-responsive-modal/styles.css';
import "react-datepicker/dist/react-datepicker.css";

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import PublicationsPage from "./pages/PublicationsPage.react";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class App extends React.Component {
    render() {
        const { userType } = this.props;

        return (
            <Router>
                <Online><IsLogged/></Online>
                <Switch>
                    {
                        Object.keys(Mapping).map((key, index) => {

                            const Component = Mapping[key].page;

                            if ( Mapping[key].userType !== undefined && userType !== Mapping[key].userType ){
                                return <Route exact path={key} component={NotFoundPage}/>
                            }
                            if ( Mapping[key].authRequired ){
                                return <PrivateRoute exact withSide path={key} component={Component}/>
                            } else{
                                return <Route exact path={key}
                                              render={() =>
                                                  <SideContainer mapping={Mapping}>
                                                    <Component/>
                                                  </SideContainer>
                                              }/>
                            }
                        })
                    }
                    <PrivateRoute path={'/edit/draft/:id'} component={EditPage}/>
                    <PrivateRoute path={`/moderate/draft/:id`} component={EditPage}/>
                    <PrivateRoute path={`/edit/post/:id`} component={EditPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </Router>
        );
    }
}

function mapStateToProps(state){
    return {
        userType: state.auth.userType
    }
}

export default connect(mapStateToProps)(App);
