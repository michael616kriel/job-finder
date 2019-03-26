import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './styles.scss';

class Pricing extends Component {
  props: any
  update(e: any) {
    let scrolled = window.pageYOffset;
    const background: any = document.querySelector('.pricing')
    background.style['background-position-y'] = `${-(scrolled * 0.1) + 250}px`
  }

  componentDidMount() {
    window.addEventListener('scroll', this.update)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.update)
  }


  render() {
    return (
      <section className="pricing py-5">
        <div className="container">

          <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center text-white">
            <h1 className="display-4">Pricing</h1>
            <p className="lead">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It's built with default Bootstrap components and utilities with little customization.</p>
          </div>


          <div className="row">

            <div className="col-lg-4">
              <div className="card mb-5 mb-lg-0">
                <div className="card-body">
                  <h5 className="card-title text-muted text-uppercase text-center">Applicant</h5>
                  <h6 className="card-price text-center">$0<span className="period">/month</span></h6>
                  <hr />
                  <ul className="fa-ul">
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>Single User</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>5GB Storage</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>Unlimited Public Projects</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>Community Access</li>
                    <li className="text-muted"><span className="fa-li"><i className="fa fa-times"></i></span>Unlimited Private Projects</li>
                    <li className="text-muted"><span className="fa-li"><i className="fa fa-times"></i></span>Dedicated Phone Support</li>
                    <li className="text-muted"><span className="fa-li"><i className="fa fa-times"></i></span>Free Subdomain</li>
                    <li className="text-muted"><span className="fa-li"><i className="fa fa-times"></i></span>Monthly Status Reports</li>
                  </ul>
                  <a href="#" className="btn btn-block btn-primary text-uppercase">Button</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card mb-5 mb-lg-0">
                <div className="card-body">
                  <h5 className="card-title text-muted text-uppercase text-center">Recruiter</h5>
                  <h6 className="card-price text-center">$5<span className="period">/month</span></h6>
                  <hr />
                  <ul className="fa-ul">
                    <li><span className="fa-li"><i className="fa fa-check"></i></span><strong>5 Users</strong></li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>50GB Storage</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>Unlimited Public Projects</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>Community Access</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>Unlimited Private Projects</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>Dedicated Phone Support</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>Free Subdomain</li>
                    <li className="text-muted"><span className="fa-li"><i className="fa fa-times"></i></span>Monthly Status Reports</li>
                  </ul>
                  <a href="#" className="btn btn-block btn-primary text-uppercase">Button</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-muted text-uppercase text-center">Company</h5>
                  <h6 className="card-price text-center">$10<span className="period">/month</span></h6>
                  <hr />
                  <ul className="fa-ul">
                    <li><span className="fa-li"><i className="fa fa-check"></i></span><strong>Unlimited Users</strong></li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>150GB Storage</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>Unlimited Public Projects</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>Community Access</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>Unlimited Private Projects</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>Dedicated Phone Support</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span><strong>Unlimited</strong> Free Subdomains</li>
                    <li><span className="fa-li"><i className="fa fa-check"></i></span>Monthly Status Reports</li>
                  </ul>
                  <a href="#" className="btn btn-block btn-primary text-uppercase">Button</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Pricing;
