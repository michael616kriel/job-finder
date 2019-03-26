import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Layout from '../../../components/frontend/layout/index'
import axios from 'axios'
// import {AuthContext} from "../../../lib/AuthContext";
import { AppContext } from "../../../components/AppContext";
import './styles.scss';
import Config from '../../../Config'

class JobView extends Component {

  state: any = {
    id: '',
    didApply: false,
    job: {
      title: '',
      description: '',
      requirements: '',
      responsibility: '',
      location: '',
      company: '',
      salary: '',
      skills: ''
    }
  }

  constructor(props: any) {
    super(props)
    console.log(props)
  }

  async getJobs() {
    const { computedMatch }: any = this.props
    try {
      const response = await axios.get(`${Config.apiUrl}/job/${computedMatch.params.id}`);
      console.log('GET JOB', response.data);
      let didApply = false
      for (var key in response.data.applicants) {
        console.log(response.data.applicants[key].uid, this.context.user.uid)
        if (response.data.applicants[key].uid === this.context.user.uid) {
          didApply = true
        }
      }
      this.setState({ job: response.data, didApply: didApply })
    } catch (error) {
      console.error(error);
    }
  }

  async apply() {
    const { computedMatch }: any = this.props
    try {
      const response = await axios.get(`${Config.apiUrl}/jobApply`, {
        params: {
          jobid: computedMatch.params.id,
          uid: this.context.user.uid
        }
      });
      this.setState({ didApply: true })
      console.log('GET', response);

    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    console.log('Jobview context', this.context)
    this.getJobs()
  }


  renderApply() {
    const { user, authenticated }: any = this.context

    if (authenticated) {
      if (user.roles.includes('applicant')) {
        if (this.state.didApply) {
          return <button type="button" className="btn btn-info">Withdraw Application</button>
        } else {
          return <button type="button" className="btn btn-primary" onClick={() => { this.apply() }}>Apply</button>
        }

      }
    } else {
      return <p className="text-muted">*You must login to apply for this job.</p>
    }

  }

  renderSkills() {
    const skills = []
    const skillSet = (this.state.job.skills) ? this.state.job.skills.split(',') : []
    for (var key in skillSet) {
      skills.push(<span key={key} className="badge badge-primary mr-2 mb-2">{skillSet[key]}</span>)
    }
    return skills
  }


  renderContent() {
    return (
      <div>
        <header className="bg-primary py-5 mb-5">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-lg-12">
                <h1 className="display-4 text-white mt-5 mb-2">{this.state.job.title}</h1>
                <p className="lead mb-5 text-white-50">{this.state.job.company}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container">

          <div className="row">
            <div className="col-md-8 mb-5">
              <h2>Description</h2>
              <hr />
              <p>{this.state.job.description}</p>

              <h2>Responsibilities</h2>
              <hr />
              <p>{this.state.job.responsibility}</p>

              <h2>Requirements</h2>
              <hr />
              <p>{this.state.job.requirements}</p>

            </div>
            <div className="col-md-4 mb-5">
              <h4>Required Skills</h4>
              {this.renderSkills()}
              <br />
              <br />
              <h4>Company</h4>
              <p><strong>{this.state.job.company}</strong></p>

              <h4>Salary</h4>
              <p><strong>R {this.state.job.salary}</strong></p>
              {this.renderApply()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Layout content={this.renderContent()}></Layout>
    );
  }
}
JobView.contextType = AppContext;
export default JobView;
