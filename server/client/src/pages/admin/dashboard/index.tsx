import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Layout from '../../../components/admin/layout/index'
import axios from 'axios'

import './styles.scss'

import Config from '../../../Config'

class Dashboard extends Component {
    state = {
        stats: {
            applicants: 0,
            employers: 0,
            jobs: 0,
        },
    }

    componentDidMount() {
        this.getStats()
    }

    async getStats() {
        try {
            const response = await axios.get(`${Config.apiUrl}/stats`)
            console.log('GET', response)
            this.setState({ stats: response.data })
        } catch (error) {
            console.error(error)
        }
    }

    renderContent() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div className="card border-0 rounded-0">
                            <div className="card-body">
                                <div className="card-innerBody d-flex align-items-center">
                                    <div className="card-icon text-light"><i aria-hidden="true" className="fa fa-dollar-sign bg-success"></i></div>
                                    <div className="ml-auto">
                                        <p className="card-title text-right text-muted">Applicants</p>
                                        <h4 className="card-text text-right ">{this.state.stats.applicants}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer d-flex ">
                                <small className="text-muted">Since last month</small><small className="text-success ml-auto">
                                    <i aria-hidden="true" className="fa fa-caret-up"></i> 5,35%
                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div className="card border-0 rounded-0">
                            <div className="card-body">
                                <div className="card-innerBody d-flex align-items-center">
                                    <div className="card-icon text-light"><i aria-hidden="true" className="fa fa-shopping-cart bg-info"></i>
                                    </div>
                                    <div className="ml-auto">
                                        <p className="card-title text-right text-muted">Employers</p>
                                        <h4 className="card-text text-right ">{this.state.stats.employers}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer d-flex ">
                                <small className="text-muted">Since last month</small>
                                <small className="text-success ml-auto">
                                    <i aria-hidden="true" className="fa fa-caret-up"></i> 8,66%
                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div className="card border-0 rounded-0">
                            <div className="card-body">
                                <div className="card-innerBody d-flex align-items-center">
                                    <div className="card-icon text-light"><i aria-hidden="true" className="fa fa-users bg-danger"></i></div>
                                    <div className="ml-auto">
                                        <p className="card-title text-right text-muted">Employers</p>
                                        <h4 className="card-text text-right ">{this.state.stats.employers}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer d-flex "><small className="text-muted">Since last month</small>
                                <small className="text-danger ml-auto">
                                    <i aria-hidden="true" className="fa fa-caret-down"></i> 2,81%
                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div className="card border-0 rounded-0">
                            <div className="card-body">
                                <div className="card-innerBody d-flex align-items-center">
                                    <div className="card-icon text-light">
                                        <i aria-hidden="true" className="fa fa-heartbeat bg-warning">
                                        </i>
                                    </div>
                                    <div className="ml-auto">
                                        <p className="card-title text-right text-muted">Jobs</p>
                                        <h4 className="card-text text-right ">{this.state.stats.jobs}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer d-flex ">
                                <small className="text-muted">Since last month</small>
                                <small className="text-success ml-auto">
                                    <i aria-hidden="true" className="fa fa-caret-up"></i> 1,74%
                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    render() {
        return <Layout title={'Dashboard'} content={this.renderContent()} />
    }
}

export default Dashboard
