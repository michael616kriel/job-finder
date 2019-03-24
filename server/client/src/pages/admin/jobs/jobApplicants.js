import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppContext } from '../../../components/AppContext'
import Layout from '../../../components/admin/layout/index'
import axios from 'axios'
import './styles.scss'
import Config from '../../../Config'

class JobApplicant extends Component {
    constructor(props) {
        super(props)

        this.state = {
            applicants: [],
        }
    }

    componentDidMount() {
        this.getJobs(this.props.match.params.id)
    }

    async getJobs(jobId) {
        try {
            const { user, authenticated } = this.context
            const response = await axios.get(`${Config.apiUrl}/jobApplicants`, {
                params: {
                    jobid: jobId
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            console.log('GET', response)
            this.setState({ applicants: response.data })
        } catch (error) {
            console.error(error)
        }
    }


    renderApplicants() {
        let applicants = []
        for (var key in this.state.applicants) {
            const { firstname, lastname, job_title, contact, about } = this.state.applicants[key]
            applicants.push(
                <a key={key} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{firstname} {lastname}</h5>
                        <small>{job_title}</small>
                    </div>
                    <p className="mb-1">{about}</p>
                    <small>{contact}</small>
                </a >
            )
        }
        return applicants
    }


    renderContent() {
        return (
            <div>
                <div className="list-group">
                    {this.renderApplicants()}
                </div>
            </div>
        )
    }

    render() {
        return <Layout title={'Job Applicants'} content={this.renderContent()} />
    }
}

JobApplicant.contextType = AppContext
export default JobApplicant
