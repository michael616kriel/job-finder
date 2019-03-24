import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Layout from '../../../components/frontend/layout/index'
import axios from 'axios'
import { AppContext } from "../../../components/AppContext";
import './styles.scss';
import Config from '../../../Config'

class Jobs extends Component {

  constructor(props) {
    super(props)
    this.state = {
      jobs: []
    }
  }

  componentDidMount() {
    this.getJobs()
  }

  applyButton(job) {
    const { user, authenticated } = this.context
    let didApply = false
    if (authenticated && user.roles.includes('applicant')) {
      for (var key in job.applicants) {
        if (job.applicants[key].uid === this.context.user.uid) {
          didApply = true
        }
      }
      if (didApply) {
        return <button type="button" className="btn btn-sm btn-outline-info btn-info">Withdraw</button>
      } else {
        return <button type="button" className="btn btn-sm btn-outline-secondary">Apply</button>
      }
    }
  }

  renderJobs() {
    let jobs = []
    let image = 'https://images.pexels.com/photos/351773/pexels-photo-351773.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    // const { user, authenticated } = this.context
    for (var key in this.state.jobs) {
      const job = this.state.jobs[key]
      // const applyButton = (authenticated) ? <button type="button" className="btn btn-sm btn-outline-secondary">Apply</button> : null
      jobs.push(
        <div className="card job-card mb-3 shadow-sm" key={key}>
          <div className="card-img-top" style={{ 'backgroundImage': `url(${image})` }}></div>
          <div className="card-body">
            <p className="card-text">{job.title}</p>
            <small className="card-subtext text-muted">{job.company}</small>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <Link to={`/job/${job._id}`} className="btn btn-sm btn-outline-secondary">View</Link>
                {this.applyButton(job)}
              </div>
              <small className="text-muted">
                <i className="fas fa-map-marker-alt location-icon"></i>
                {job.location}
              </small>
            </div>
          </div>
        </div>
      )
    }
    return jobs
  }

  async getJobs() {
    try {
      const response = await axios.get(`${Config.apiUrl}/jobs`);
      console.log('GET', response);
      this.setState({ jobs: response.data })
    } catch (error) {
      console.error(error);
    }
  }


  renderContent() {
    return (
      <div>
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Album example</h1>
            <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
            <p>
              <a href="#" className="btn btn-primary my-2 mr-3">Main call to action</a>
              <a href="#" className="btn btn-secondary my-2">Secondary action</a>
            </p>
          </div>
        </section>
        <div className="content-container">


          <div className="container">

            <div className="btn-group job-filter" role="group" aria-label="First group">
              <button type="button" className="btn btn-outline-secondary">Programming</button>
              <button type="button" className="btn btn-outline-secondary">UX/Design</button>
              <button type="button" className="btn btn-outline-secondary">Sound/Video</button>
            </div>
            <hr className="mb-4" />

            <div className="card-columns">
              {this.renderJobs()}
            </div>

            <hr />
            <div className="container-fluid text-center">
              <button type="button" className="btn btn-light mx-auto mb-5">Load More <i className="fa fa-plus"></i></button>
            </div>

          </div>

        </div>

      </div>
    );
  }

  render() {
    return (
      <Layout content={this.renderContent()}></Layout>
    );
  }

}
Jobs.contextType = AppContext;
export default Jobs;
