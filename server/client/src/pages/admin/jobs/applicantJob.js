import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppContext } from '../../../components/AppContext'
import Layout from '../../../components/admin/layout/index'
import axios from 'axios'
import './styles.scss'
import Config from '../../../Config'

class ApplicantJobs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            jobs: [],
        }
    }

    componentDidMount() {
        this.getJobs()
    }

    async getJobs() {
        try {
            const { user, authenticated } = this.context
            const response = await axios.get(`${Config.apiUrl}/jobsApplied`, {
                params: {
                    uid: user.uid
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            console.log('GET', response)
            this.setState({ jobs: response.data })
        } catch (error) {
            console.error(error)
        }
    }


    renderJobs() {
        let jobs = []
        for (var key in this.state.jobs) {
            const { title, industry, location } = this.state.jobs[key]
            jobs.push(
                <a key={key} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{title}</h5>
                        <small>{location}</small>
                    </div>
                    {/* <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> */}
                    <small>{industry}</small>
                </a>
            )
        }
        return jobs
    }


    renderContent() {
        return (
            <div>
                <div className="list-group">
                    {this.renderJobs()}
                </div>
            </div>
        )
    }

    render() {
        return <Layout title={'Jobs You Applied For'} content={this.renderContent()} />
    }
}

ApplicantJobs.contextType = AppContext
export default ApplicantJobs
