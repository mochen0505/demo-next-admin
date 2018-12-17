import React from 'react'
import { connect } from 'react-redux'
import {localeEN, localeZH} from "../redux/actions/localeAction";

const mapDispatchToProps = (dispatch) => {
    return {
        localeZH: () => dispatch(localeZH()),
        localeEN: () => dispatch(localeEN())
    };
};

class LayoutWrapper extends React.Component{

    componentDidMount() {
        if ( localStorage.getItem('language') ) {
            localStorage.getItem('language') === 'zh-CN' ? this.props.localeZH() : this.props.localeEN();
        } else {
            navigator.language === 'zh-CN' ? this.props.localeZH() : this.props.localeEN();
        }
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

export default connect(null, mapDispatchToProps)(LayoutWrapper)