import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from '../navbar/index'
import Footer from '../footer/index'
import './styles.scss';

class Layout extends Component {
  props: any
  render() {
    return (
      <div id="page-top">
        <Navbar />
        {this.props.content}
        <Footer />
      </div>
    );
  }
}

export default Layout;
