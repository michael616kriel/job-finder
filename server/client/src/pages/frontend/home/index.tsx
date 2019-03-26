import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import Pricing from '../../../components/frontend/pricing/index'
import Layout from '../../../components/frontend/layout/index'
import Showcase from '../../../components/frontend/showcase/index'
import Parrallax from '../../../components/frontend/parrallax/index'
import parrallaxBG from '../../../assets/img/hero.jpeg'
import Config from '../../../Config'

import './styles.scss';

class Home extends Component {

  state: any = {
    stats: {
      applicants: 0,
      recruiters: 0,
      companies: 0,
      jobs: 0
    }
  }

  constructor(props: any) {
    super(props)
    console.log(props)
  }

  componentDidMount() {
    this.getStats()
  }

  async getStats() {
    try {
      const response = await axios.get(`${Config.apiUrl}/stats`);
      console.log('GET', response);
      this.setState({ stats: response.data })
    } catch (error) {
      console.error(error);
    }
  }

  renderContent() {
    return (
      <div>

        <header className="masthead">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 text-center">
                <h1 className="font-weight-light">The Future of job searching</h1>
                <p className="lead">With our amazing platform minimize the time and effort to find jobs, employees or recruiters. We have the complete solution for personal and bussiness users.</p>
              </div>
            </div>
          </div>
        </header>
        <Showcase />
        <Parrallax image={parrallaxBG} />
        <div className="container mt-3 mb-5">

          <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 className="display-4">Stats</h1>
            <p className="lead">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It's built with default Bootstrap components and utilities with little customization.</p>
          </div>

          <div className="row text-center">
            <div className="counter col-3">
              <i className="fa fa-users fa-2x mb-3"></i>
              <h2 className="text-center" data-to="15500" data-speed="1500">{this.state.stats.applicants}</h2>
              <hr />
              <p className="count-text ">Applicants</p>
            </div>

            <div className="counter col-3">
              <i className="fa fa-trophy fa-2x mb-3"></i>
              <h2 className="text-center" data-to="15500" data-speed="1500">{this.state.stats.recruiters}</h2>
              <hr />
              <p className="count-text ">Recruiters</p>
            </div>

            <div className="counter col-3">
              <i className="fa fa-landmark fa-2x mb-3"></i>
              <h2 className="text-center" data-to="15500" data-speed="1500">{this.state.stats.companies}</h2>
              <hr />
              <p className="count-text ">Companies</p>
            </div>

            <div className="counter col-3">
              <i className="fa fa-landmark fa-2x mb-3"></i>
              <h2 className="text-center" data-to="15500" data-speed="1500">{this.state.stats.jobs}</h2>
              <hr />
              <p className="count-text ">Jobs</p>
            </div>

          </div>
        </div>

        <Pricing />

      </div>
    );
  }


  render() {
    return (
      <Layout content={this.renderContent()}></Layout>
    );
  }

}

export default Home;
