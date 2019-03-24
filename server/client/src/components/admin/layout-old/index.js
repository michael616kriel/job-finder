import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sidebar from '../sidebar/index'
import Topbar from '../topbar/index'
import Title from '../title/index'

import './styles.scss';

class LayoutOld extends Component {

  componentDidMount() {
    // console.log('Layout PROPS', this.props)
  }

  render() {
    return (
      <div className="admin">
        <Topbar {...this.props} />
        <div className={(!this.props.fill) ? 'container-fluid' : 'container-fluid fill'}>
          <div className="row">
            <Sidebar />
            <main role="main" className={`col-md-9 ml-sm-auto col-lg-10 ${(this.props.fill) ? 'container-fill' : 'px-4'}`}>
              {(!this.props.fill) ? <Title text={this.props.title} toolbar={this.props.toolbar} /> : ''}
              {this.props.content}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default LayoutOld;
