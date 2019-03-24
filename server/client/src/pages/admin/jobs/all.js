import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppContext } from '../../../components/AppContext'
import Layout from '../../../components/admin/layout/index'
import axios from 'axios'
import './styles.scss'
import Config from '../../../Config'

class AllJobs extends Component {
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
            const response = await axios.get(`${Config.apiUrl}/jobsPosted`, {
                params: {
                    uid: user.uid
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            console.log('GET', response.data)
            this.setState({ jobs: response.data })
        } catch (error) {
            console.error(error)
        }
    }

    async deletJob(id) {
        try {
            const response = await axios.get(`${Config.apiUrl}/job/delete/${id}`, {
                params: {},
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            console.log('GET', response)
            for (var i = 0; i < this.state.jobs.length; i++) {
                const job = this.state.jobs[i]
                if (job._id === id) {
                    this.state.jobs.splice(i, 1)
                }
            }
            this.setState({ jobs: this.state.jobs })
        } catch (error) {
            console.error(error)
        }
    }

    renderJobs() {
        let jobs = []
        for (var key in this.state.jobs) {
            const { title, company, _id } = this.state.jobs[key]
            jobs.push(
                <tr key={key}>
                    <th scope="row">{_id}</th>
                    <td>{title}</td>
                    <td>{company}</td>
                    <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <Link to={`/admin/job/applicants/${_id}`} className="btn btn-outline-secondary">
                                View Applicants
                            </Link>
                            <Link to={`/admin/edit-job/${_id}`} className="btn btn-outline-secondary">
                                Edit
                            </Link>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => this.deletJob(_id)}>
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            )
        }
        return jobs
    }

    renderToolbar() {
        return (
            <div className="btn-group" role="group" aria-label="Basic example">
                <Link to={`/admin/new-job`} className="btn btn-outline-secondary">
                    Create
                </Link>
            </div>
        )
    }

    renderContent() {
        return (
            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Company</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderJobs()}</tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1">
                                Previous
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                1
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                2
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                3
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

    render() {
        return <Layout title={'All Jobs'} content={this.renderContent()} toolbar={this.renderToolbar()} />
    }
}

AllJobs.contextType = AppContext
export default AllJobs
