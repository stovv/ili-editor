import React from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {
    PrivateRoute,
    SideContainer
} from "./components";

import {
    EditPage,
    NotFoundPage
} from './pages';

import { Mapping } from './constants';
import IliThemeProvider from "./theme";

import 'moment/locale/ru';
import './App.css';


class App extends React.Component {

  render() {
    const { userType } = this.props;

    return (
        <IliThemeProvider>
            <Router>
                <SideContainer mapping={Mapping}>
                    <Switch>
                        {
                            Object.keys(Mapping).map((key, index) => {
                                if ( Mapping[key].userType !== undefined && userType !== Mapping[key].userType ){
                                    return <Route exact path={key} component={NotFoundPage}/>
                                }
                                if ( Mapping[key].authRequired ){
                                    return <PrivateRoute exact path={key} component={Mapping[key].page}/>
                                } else{
                                    return <Route exact path={key} component={Mapping[key].page}/>;
                                }
                            })
                        }
                        <PrivateRoute exact path={'/edit/draft/:id'} component={EditPage}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </SideContainer>
            </Router>
        </IliThemeProvider>
    );
  }
}

function mapStateToProps(state){
    return {
        userType: state.auth.userType
    }
}

export default connect(mapStateToProps)(App);
