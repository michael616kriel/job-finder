import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './styles.scss';

class Parrallax extends Component {
  props: any
  update(e: any) {
    let scrolled = window.pageYOffset;
    const background: any = document.querySelector('.parrallax')
    background.style['background-position-y'] = `${-(scrolled * 0.1)}px`
  }

  componentDidMount() {
    window.addEventListener('scroll', this.update)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.update)
  }

  render() {
    return (
      <div className="parrallax"></div>
    );
  }
}

export default Parrallax;
