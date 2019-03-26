import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './styles.scss';

import Showcase1 from '../../../assets/img/pexels-photo.jpg'
import Showcase2 from '../../../assets/img/pexels-photo-2.jpeg'


class Showcase extends Component {
  props: any
  render() {
    return (
      <section className="showcase">
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{ backgroundImage: `url(${Showcase1})` }}></div>
            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
              <h2>Find the job of your dreams</h2>
              <p className="lead mb-0">When you use a theme created by Start Bootstrap, you know that the theme will look great on any device, whether it's a phone, tablet, or desktop the page will behave responsively!</p>
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-lg-6 text-white showcase-img" style={{ backgroundImage: `url(${Showcase2})` }}></div>
            <div className="col-lg-6 my-auto showcase-text">
              <h2>Conduct live interviews</h2>
              <p className="lead mb-0">Newly improved, and full of great utility classes, Bootstrap 4 is leading the way in mobile responsive web development! All of the themes on Start Bootstrap are now using Bootstrap 4!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Showcase;
