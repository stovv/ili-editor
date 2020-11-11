import React from 'react';
import { lightTheme, darkTheme } from "./theme.js";
import {ThemeProvider} from 'styled-components';
import {connect} from 'react-redux';

const IliThemeProvider = ({mode, children}) => {
    const theme = mode === 'dark' ? darkTheme : lightTheme;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

function mapStateToProps(state) {
    return{
        //mode: state.page.mode
    }
}

export default connect(mapStateToProps)(IliThemeProvider)
