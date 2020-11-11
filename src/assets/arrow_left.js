import React from "react"
import {withTheme} from "styled-components";


class ArrowLeft extends React.Component {
    state ={
        hover: false,
    }
    style = {
        transition: "all 0.4s ease 0s",
        cursor: "pointer"
    }

    render(){
        const {theme, ...props} = this.props;
        return(
            <div onMouseEnter={()=>this.setState({hover:true})}
                 onMouseLeave={()=>this.setState({hover:false})}>
                <svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
                    <path
                        style={this.style}
                        d="M31.665 20H8.332M19.999 31.666L8.332 20 19.999 8.333"
                        stroke={this.state.hover ? theme.text.hover : theme.text.secondary}
                        strokeWidth={4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        );

    }
}

export default withTheme(ArrowLeft);
