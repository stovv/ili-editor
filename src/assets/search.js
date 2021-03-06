import * as React from "react"
import { withTheme } from 'styled-components';


class SearchIcon extends React.Component {
    state ={
        hover: false,
    }
    style = {
        transition: "all 0.4s ease 0s",
    }
    render(){
        const {theme, ...props} = this.props;
        return (
            <div onMouseEnter={()=>this.setState({hover:true})}
                 onMouseLeave={()=>this.setState({hover:false})}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
                    <path
                        d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
                        style={this.style}
                        stroke={this.state.hover ? theme.text.hover : theme.text.editorSecondary}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        );
    }
};

export default withTheme(SearchIcon);