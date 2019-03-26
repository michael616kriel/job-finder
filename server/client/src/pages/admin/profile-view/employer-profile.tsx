import React, { Component } from 'react';
import { AppContext } from "../../../components/AppContext";
import Layout from '../../../components/admin/layout/index'
import axios from 'axios'
import './applicant-profile.scss';
import Config from '../../../Config'

class CompanyProfileView extends Component {
  props: any
  state = {
    profile: {}
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


  renderContent() {
    const { profile }: any = this.state
    return (<div>

      <p>{profile.address}</p>
      <p>{profile.contact}</p>
      <p>{profile.email}</p>
      <p>{profile.industry}</p>
      <p>{profile.name}</p>
      <p>{profile.website}</p>

    </div>)
  }


  render() {
    return (
      <Layout title={'Profile'} content={this.renderContent()}></Layout>
    );
  }
}

CompanyProfileView.contextType = AppContext;
export default CompanyProfileView;

