import React, { Component } from 'react';
import './styles.scss';

class Loader extends Component {
    props: any
    render() {
        return (
            <span className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </span>
        )
    }
}
export default Loader;