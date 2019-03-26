import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import './App.scss'

import AppState, { AppContext, Provider } from './components/AppContext'
import BaseRoute from './components/BaseRoute'

import Home from './pages/frontend/home/index'
import Login from './pages/frontend/login/index'
import Signup from './pages/frontend/signup/index'
import Jobs from './pages/frontend/jobs/index'
import JobView from './pages/frontend/job-view/index'

import Dashboard from './pages/admin/dashboard/index'

import AllJobs from './pages/admin/jobs/all'
import CreateJobs from './pages/admin/jobs/create'
import EditJobs from './pages/admin/jobs/edit'

import ApplicantJobs from './pages/admin/jobs/applicantJob'
import JobApplicant from './pages/admin/jobs/jobApplicants'

import Messages from './pages/admin/messages'
import Settings from './pages/admin/settings'
import Networking from './pages/admin/networking'

import ApplicantProfile from './pages/admin/profiles/applicant.profile'
import EmployerProfile from './pages/admin/profiles/employer.profile'
import ApplicantProfileView from './pages/admin/profile-view/applicant-profile'
import EmployerProfileView from './pages/admin/profile-view/employer-profile'
import NewLayout from './pages/admin/new-layout/index'

class App extends Component {
    roles = {
        SUPER_ADMIN: ['admin'],
        ALL: ['applicant', 'company', 'recruiter'],
        ADMIN: ['company', 'recruiter'],
        APPLICANT: ['applicant'],
        COMPANY: ['company'],
        RECRUITER: ['recruiter'],
    }
    appState: any = new AppState()

    componentDidMount() {
        // console.log('App', this.props)
    }

    render() {
        return (
            <Provider value={this.appState}>
                <Router>
                    <Switch>
                        <BaseRoute exact path="/" component={Home} />
                        <BaseRoute exact path="/new" component={NewLayout} />

                        {/*  render so history prop can be passed to child components */}
                        <Route exact path="/login" render={(props) => <BaseRoute {...props} component={Login} />} />
                        <Route exact path="/signup" render={(props) => <BaseRoute {...props} component={Signup} />} />

                        <BaseRoute exact path="/jobs" component={Jobs} />
                        <BaseRoute exact path="/job/:id" component={JobView} />

                        <Route
                            exact
                            path="/admin/dashboard"
                            render={(props) => <BaseRoute {...props} component={Dashboard} protected={true}
                                roles={this.roles.ADMIN} />}
                        />
                        <Route
                            exact
                            path="/admin/networking"
                            render={(props) => <BaseRoute {...props} component={Networking} protected={true}
                                roles={this.roles.ADMIN} />}
                        />
                        <Route
                            exact
                            path="/admin/messages"
                            render={(props) => <BaseRoute {...props} component={Messages} protected={true}
                                roles={this.roles.ADMIN} />}
                        />
                        <Route
                            exact
                            path="/admin/settings"
                            render={(props) => <BaseRoute {...props} component={Settings} protected={true}
                                roles={this.roles.ADMIN} />}
                        />

                        <Route
                            exact
                            path="/admin/jobs"
                            render={(props) => <BaseRoute {...props} component={AllJobs} protected={true}
                                roles={this.roles.ADMIN} />}
                        />
                        <Route
                            exact
                            path="/admin/new-job"
                            render={(props) => <BaseRoute {...props} component={CreateJobs} protected={true}
                                roles={this.roles.ADMIN} />}
                        />
                        <Route
                            exact
                            path="/admin/edit-job/:id"
                            render={(props) => <BaseRoute {...props} component={EditJobs} protected={true}
                                roles={this.roles.ADMIN} />}
                        />

                        <Route
                            exact
                            path="/admin/applicant/jobs"
                            render={(props) => <BaseRoute {...props} component={ApplicantJobs} protected={true}
                                roles={this.roles.ADMIN} />}
                        />

                        <Route
                            exact
                            path="/admin/job/applicants/:id"
                            render={(props) => <BaseRoute {...props} component={JobApplicant} protected={true}
                                roles={this.roles.ADMIN} />}
                        />


                        <Route
                            exact
                            path="/admin/profiles/employer"
                            render={(props) => <BaseRoute {...props} component={EmployerProfile} protected={true}
                                roles={this.roles.ADMIN} />}
                        />

                        <Route
                            exact
                            path="/admin/profiles/applicant"
                            render={(props) => <BaseRoute {...props} component={ApplicantProfile} protected={true}
                                roles={this.roles.ADMIN} />}
                        />

                        <Route
                            exact
                            path="/admin/profile/applicant/:id"
                            render={(props) => <BaseRoute {...props} component={ApplicantProfileView} protected={true}
                                roles={this.roles.ALL} />}
                        />

                        <Route
                            exact
                            path="/admin/profile/employer/:id"
                            render={(props) => <BaseRoute {...props} component={EmployerProfileView} protected={true}
                                roles={this.roles.ALL} />}
                        />

                        <BaseRoute path="*" component={() => '404 Not Found'} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App
