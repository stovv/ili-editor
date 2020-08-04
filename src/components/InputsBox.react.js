import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from "@rebass/forms";
import { withTheme } from "styled-components";

import { Redactor } from '../actions';


class InputsBox extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            in_save: false
        }

        switch (props.inputType) {
            case "newUser":{
                this.state = {
                    ...this.state,
                    name : "",
                    secondName: "",
                    newUser: [
                            {
                                type: 'name',
                                placeholder: 'Имя'
                            },
                            {
                                type: 'secondName',
                                placeholder:'Фамилия'
                            }
                    ]
                }
                break;
            }
            default: return;
        }
        this.autoSave = this.autoSave.bind(this);
        this.autoSave();
    }

    componentDidMount() {
        const { inputType, dispatch, initialValue } = this.props;

        if (inputType !== undefined && initialValue !== undefined){
            dispatch(Redactor.addTempData(inputType, initialValue));
        }
        switch (inputType) {
            default:
                return;
        }
    }

    autoSave(){
        setTimeout(function (){
            if (this.state.in_save){
                const { inputType, dispatch, tmp } = this.props;
                dispatch(Redactor.addTempData(inputType, {}));

                const items = this.state[inputType];
                let toSave = {};
                items.forEach(item =>{
                    toSave = {
                        ...toSave,
                        [item.type]: this.state[item.type]
                    }
                });
                dispatch(Redactor.addTempData(inputType, toSave))
                this.setState({
                    in_save: false
                })
            }

            this.autoSave();
        }.bind(this), 1500);
    }

    render(){
        const { inputType, theme } = this.props;
        const items = this.state[inputType];

        return (
            items.map((item, index)=>(
                <React.Fragment key={index}>
                    <Input
                        my={"10px"}
                        sx={{outline: theme.text.primary, color: theme.text.primary, borderRadius: "4px"}}
                        onChange={(e) => this.setState({[item.type]: e.target.value, in_save: true})}
                        type={item.type}
                        placeholder={item.placeholder}
                    />
                </React.Fragment>
            ))
        );
    }
}

function mapStateToProps(state){
    return {
        tmp: state.redactor.tmp
    }
}

InputsBox.propTypes ={
    inputType: PropTypes.oneOf([
        "newUser",
    ]).isRequired
}

export default connect(mapStateToProps)(withTheme(InputsBox));