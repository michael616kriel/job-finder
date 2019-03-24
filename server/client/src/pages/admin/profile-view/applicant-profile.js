import React, { Component } from 'react';
import { AppContext } from "../../../components/AppContext";
import Layout from '../../../components/admin/layout/index'
import axios from 'axios'
import './applicant-profile.scss';
import Config from '../../../Config'

class ApplicantProfileView extends Component {

  state = {
    profile: {
      education: [],
      experience: []
    }
  }

  componentDidMount() {
    this.getProfile()
  }

  async getProfile() {
    try {
      const { user } = this.context
      const response = await axios.get(`${Config.apiUrl}/profile`, {
        params: { uid: this.props.match.params.id },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('authToken')
        }
      });
      console.log('profile', response.data);
      this.setState({ profile: response.data })
    } catch (error) {
      console.error(error);
    }
  }

  renderEducation() {
    let education = []
    for (var key in this.state.profile.education) {
      let item = this.state.profile.education[key]
      education.push(
        <a key={key} className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{item.school}</h5>
            <small>{item.graduation}</small>
          </div>
          <p className="mb-1">{item.qualification}</p>
        </a>
      )
    }
    return education
  }

  renderExperience() {
    let experience = []
    for (var key in this.state.profile.experience) {
      let item = this.state.profile.experience[key]
      experience.push(
        <a key={key} className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{item.company}</h5>
            <small>{item.from} - {item.to}</small>
          </div>
          <small>{item.position}</small>
          <p className="mb-1">{item.responsibility}</p>
        </a>
      )
    }
    return experience
  }

  renderSkills() {
    let skills = []
    for (var key in this.state.profile.skills) {
      let item = this.state.profile.skills[key]
      skills.push(
        <a key={key} className="badge badge-primary mr-2 mb-2">{item}</a>
      )
    }
    return skills
  }

  renderContent() {
    const { firstname, lastname, job_title, about, } = this.state.profile
    return (<div>
      <h3>{firstname} {lastname}</h3>
      <p>{job_title}</p>
      <p>{about}</p>
      <h3 className="mb-2 mt-2">Skills</h3>
      {this.renderSkills()}
      <h3 className="mb-2 mt-2">Education</h3>
      <div className="list-group">
        {this.renderEducation()}
      </div>
      <h3 className="mb-2 mt-2">Experience</h3>
      <div className="list-group">
        {this.renderExperience()}
      </div>
    </div>)
  }


  render() {
    return (
      <Layout title={'Profile'} content={this.renderContent()}></Layout>
    );
  }
}

ApplicantProfileView.contextType = AppContext;
export default ApplicantProfileView;

