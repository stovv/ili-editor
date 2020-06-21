import React from 'react';
import {BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {
    PrivateRoute,
    SideContainer
} from "./components";
import {
    LoginPage,
    EditPage,
    DraftsPage,
    ModeratePage
} from './pages';
import { Mapping } from './constants';
import IliThemeProvider from "./theme";

import 'moment/locale/ru';
import './App.css';
import 'antd/dist/antd.css';


class App extends React.Component {

  render() {
    return (
        <IliThemeProvider>
            <Router>
                <SideContainer mapping={Mapping} exclude={['/login']}>
                    <Switch>
                        <Route exact path="/login" >
                            <LoginPage/>
                        </Route>
                        <PrivateRoute exact path="/" component={DraftsPage}/>
                        <PrivateRoute exact path="/edit/:id" component={EditPage}/>
                        <PrivateRoute exact path="/moderate" component={ModeratePage}/>
                    </Switch>
                </SideContainer>
            </Router>
        </IliThemeProvider>
    );
  }
}

export default App;
