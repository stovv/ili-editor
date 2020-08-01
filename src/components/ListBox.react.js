import React from "react";
import { Box } from 'rebass';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'react-functional-select';

import { Redactor } from '../actions';

const themeConfig = {
    menu: {
        width: '100%',
        margin: '10px 0 0 0',
        padding: '0',
        borderRadius: '0.25rem',
        backgroundColor: '#fff',
        animation: 'FADE_IN_KEYFRAMES 0.225s ease-in-out forwards',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 11px rgba(0, 0, 0, 0.1)',
        option: {
            textAlign: 'left',
            selectedColor: '#fff',
            selectedBgColor: '#007bff',
            padding: '0',
            margin: "auto",
            focusedBgColor: 'rgba(0, 123, 255, 0.20)'
        }
    }
}

class ListBox extends React.Component{
    componentDidMount() {
        const { listType, dispatch, initialValue } = this.props;

        if (initialValue !== undefined){
            dispatch(Redactor.addTempData(listType, initialValue));
        }

        switch (listType) {
            case "rubric":{
                dispatch(Redactor.getRubrics())
                break;
            }
            default:
                return;
        };
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { listType, redactor } = this.props;
        return nextProps.redactor[listType] !== redactor[listType];
    }

    render(){
        const { listType, redactor, initialValue, dispatch } = this.props;
        const items = redactor[listType];

        return (
            <Select
                initialValue={initialValue}
                options={items}
                onOptionChange={(option)=>{
                    dispatch(Redactor.addTempData(listType, option))
                }}
                themeConfig={themeConfig}
                isSearchable={true}
                getOptionValue={(option)=>option.id}
                getOptionLabel={(option)=>option.title}
            />
        );
    }
}

function mapStateToProps(state){
    return{
        redactor: state.redactor
    }
}

ListBox.propTypes ={
    listType: PropTypes.oneOf([
        "rubric"
    ]).isRequired,
    initialValue: PropTypes.any
}

export default connect(mapStateToProps)(ListBox);