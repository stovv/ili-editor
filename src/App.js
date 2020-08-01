import React from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router,
    Switch,
    Route,
    withRouter
} from "react-router-dom";

import { registerPlugin } from 'react-filepond';
import {
    PrivateRoute,
    SideContainer
} from "./components";

import {
    EditPage,
    NotFoundPage
} from './pages';

import { Mapping } from './mapping';
import IliThemeProvider from "./theme";

import './App.css';
import 'moment/locale/ru';
import 'filepond/dist/filepond.min.css';
import 'react-responsive-modal/styles.css';
import "react-datepicker/dist/react-datepicker.css";

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class App extends React.Component {

  render() {
    const { userType } = this.props;

    return (
        <Router>
            <Switch>
                {
                    Object.keys(Mapping).map((key, index) => {

                        const Component = Mapping[key].page;

                        if ( Mapping[key].userType !== undefined && userType !== Mapping[key].userType ){
                            return <Route exact path={key} component={NotFoundPage}/>
                        }
                        if ( Mapping[key].authRequired ){
                            return <PrivateRoute exact path={key} component={() => <IliThemeProvider><SideContainer
                                mapping={Mapping}><Component/></SideContainer></IliThemeProvider>}/>
                        } else{
                            return <Route exact path={key} component={() =>
                                <IliThemeProvider><SideContainer
                                    mapping={Mapping}><Component/></SideContainer></IliThemeProvider>}/>;
                        }
                    })
                }
                <Route path={'/edit/draft/:id'} component={EditPage}/>
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
