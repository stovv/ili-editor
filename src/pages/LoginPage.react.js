import React from 'react';
import Typist from "react-typist";
import { Flex, Box } from 'rebass';
import {connect} from "react-redux";
import { Input } from '@rebass/forms';
import {withTheme} from "styled-components";
import { withRouter } from 'react-router-dom';

import { Public } from '../api';
import { Logo } from '../assets';
import { Auth } from '../actions';
import { Typography, Forms } from "../components";


class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            cover: null,
            error: null,
            localAuth: false,
            loading: false
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        Public.randomUnsplashImage()
            .then(response => {
                this.setState({cover: response.request.responseURL})
            })
            .catch(reason => console.log(reason));
    }

    login(){
        const { login, password, localAuth } = this.state;
        const { dispatch, history } = this.props;

        if ( !localAuth ){
            this.setState({ localAuth: true})
        }

        if (login.length === 0){
            this.setState({ error: "email не введен" })
            return
        } else if (password.length === 0){
            this.setState({ error: "пароль не введен" })
            return
        }else{
            this.setState({ error: null })
        }

        this.setState({ loading: true })
        dispatch(Auth.loginAction({login, password}))
            .then((data)=>{
                if (!this.props.logged){
                    this.setState({ loading: false, error: "неправильный логин или пароль" });
                }else{
                    //this.setState({ loading: false, localAuth: true});
                    history.push('/');
                }
            })
    }

    logout(){
        const { dispatch } = this.props;
        dispatch(Auth.logout())
            .then((data)=>{
                this.setState({ loading: false })
            })
    }

    render(){
        const { theme, logged } = this.props;
        const { cover, error, loading, localAuth } = this.state;

        return(
            <Box height="100vh" bg={theme.colors.backgroundInvert}>

                <Flex height="80vh" width="80vw" maxHeight="900px" maxWidth="1440px" sx={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    boxShadow: "0px 0px 38px -7px rgba(0,0,0,0.75)"
                }} bg={theme.colors.backgroundInverted}>
                    <Box width={[3/5]} sx={{
                        backgroundSize: 'cover',
                        background: `url(${cover}) center no-repeat`
                    }}/>
                    <Box width={[2/5]} height="100%">
                        <Flex flexDirection="column">
                            <Box ml="auto" mr="36px" mt="36px">
                                {/*<Icons.HelpIcon/>*/}
                            </Box>
                            <Box width={["150px"]} height={["150px"]} mx="auto">
                                <a href="/">
                                    <Logo width="100%" primary={theme.colors.primary}
                                          background={theme.colors.secondary}/>
                                </a>
                            </Box>
                            <Box mx="auto" minHeight="100px">
                                <Typography.Normal color={theme.colors.primary} textAlign="center">
                                    <Typist cursor={{blink: true, hideWhenDone: true}}>
                                        Пиши и редактируй.
                                        <Typist.Delay ms={1000} />
                                        <br/>
                                        🙌
                                        <Typist.Delay ms={200} />
                                        🤔
                                        <Typist.Delay ms={200} />
                                        😃
                                    </Typist>
                                </Typography.Normal>
                            </Box>
                            <Box mt="auto" mx="10%">
                                {
                                    logged && !localAuth
                                        ? <>
                                            <Box mx="auto" maxWidth="300px" mt="150px" minHeight="40px">
                                                <Typography.Normal color={theme.colors.primary} textAlign="center">
                                                    {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                                                    <Typist startDelay={500} avgTypingDelay={30}
                                                        cursor={{blink: true, hideWhenDone: true}}>
                                                        Кажется вы уже вошли 🤔
                                                    </Typist>
                                                </Typography.Normal>
                                            </Box>
                                            <Box mx="auto" maxWidth="300px" height="56px" mt="10px">
                                                <Forms.Buttons.Loading size={23} onClick={this.logout}
                                                                       component={Forms.Buttons.Simple}
                                                                       loading={loading}>Выйти</Forms.Buttons.Loading>
                                            </Box>
                                        </>
                                        : <>
                                            <Box mx="auto" maxWidth="300px" mt={"100px"}>
                                                <Input
                                                    sx={{outline: 'none', color: theme.text.onPrimary,
                                                        borderColor: error !== null ? theme.colors.primary : undefined}}
                                                    onChange={(e) => this.setState({login: e.target.value})}
                                                    type='email'
                                                    placeholder='email'
                                                />
                                            </Box>
                                            <Box mx="auto" maxWidth="300px" mt={theme.spacing.block}>
                                                <Input
                                                    sx={{outline: 'none', color: theme.text.onPrimary,
                                                        borderColor: error !== null ? theme.colors.primary : undefined}}
                                                    onChange={(e) => this.setState({password: e.target.value})}
                                                    type='password'
                                                    placeholder='пароль'
                                                />
                                            </Box>
                                            <Box mx="auto" maxWidth="300px" mt="10px" minHeight="40px">
                                                {
                                                    error !== null &&
                                                    <Typography.XSmall color={theme.colors.primary}>
                                                        {error}
                                                    </Typography.XSmall>
                                                }
                                            </Box>
                                            <Box mx="auto" maxWidth="300px" height="56px" mt="50px">
                                                <Forms.Buttons.Loading size={23} onClick={this.login}
                                                                       component={Forms.Buttons.Simple}
                                                                       loading={loading}>Войти</Forms.Buttons.Loading>
                                            </Box>
                                        </>
                                }
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        );
    }
}


function mapStateToProps(state) {
    return {
        logged: state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps)(withTheme(withRouter(LoginPage)));