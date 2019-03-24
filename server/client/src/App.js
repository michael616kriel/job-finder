import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import './App.scss'

import AppState, { AppContext } from './components/AppContext'
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
// import RecruiterProfile from './pages/admin/profiles/recruiter.profile'
import ApplicantProfileView from './pages/admin/profile-view/applicant-profile'
import EmployerProfileView from './pages/admin/profile-view/employer-profile'
// import RecruiterProfileView from './pages/admin/profile-view/recruiter-profile'

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

    componentDidMount() {
        // console.log('App', this.props)
    }

    render() {
        return (
            <AppContext.Provider value={new AppState()}>
                <Router>
                    <Switch>
                        <BaseRoute exact path="/" component={Home} />
                        <BaseRoute exact path="/new" component={NewLayout} />

                        {/*  render so history prop can be passed to child components */}
                        <Route path="/login" render={(props) => <BaseRoute {...props} component={Login} />} />
                        <Route path="/signup" render={(props) => <BaseRoute {...props} component={Signup} />} />

                        <BaseRoute path="/jobs" component={Jobs} />
                        <BaseRoute path="/job/:id" component={JobView} />

                        <Route
                            protected={true}
                            roles={this.roles.ADMIN}
                            path="/admin/dashboard"
                            render={(props) => <BaseRoute {...props} component={Dashboard} />}
                        />
                        <Route
                            protected={true}
                            roles={this.roles.ADMIN}
                            path="/admin/networking"
                            render={(props) => <BaseRoute {...props} component={Networking} />}
                        />
                        <Route
                            protected={true}
                            roles={this.roles.ADMIN}
                            path="/admin/messages"
                            render={(props) => <BaseRoute {...props} component={Messages} />}
                        />
                        <Route
                            protected={true}
                            roles={this.roles.ADMIN}
                            path="/admin/settings"
                            render={(props) => <BaseRoute {...props} component={Settings} />}
                        />

                        <Route
                            protected={true}
                            roles={this.roles.ADMIN}
                            path="/admin/jobs"
                            render={(props) => <BaseRoute {...props} component={AllJobs} />}
                        />
                        <Route
                            protected={true}
                            roles={this.roles.ADMIN}
                            path="/admin/new-job"
                            render={(props) => <BaseRoute {...props} component={CreateJobs} />}
                        />
                        <Route
                            protected={true}
                            roles={this.roles.ADMIN}
                            path="/admin/edit-job/:id"
                            render={(props) => <BaseRoute {...props} component={EditJobs} />}
                        />

                        <Route
                            protected={true}
                            roles={this.roles.ADMIN}
                            path="/admin/applicant/jobs"
                            render={(props) => <BaseRoute {...props} component={ApplicantJobs} />}
                        />

                        <Route
                            protected={true}
                            roles={this.roles.ADMIN}
                            path="/admin/job/applicants/:id"
                            render={(props) => <BaseRoute {...props} component={JobApplicant} />}
                        />


                        <Route
                            protected={true}
                            roles={this.roles.ADMIN}
                            path="/admin/profiles/employer"
                            render={(props) => <BaseRoute {...props} component={EmployerProfile} />}
                        />

                        <Route
                            protected={true}
                            roles={this.roles.ADMIN}
                            path="/admin/profiles/applicant"
                            render={(props) => <BaseRoute {...props} component={ApplicantProfile} />}
                        />

                        <Route
                            protected={true}
                            roles={this.roles.ALL}
                            path="/admin/profile/applicant/:id"
                            render={(props) => <BaseRoute {...props} component={ApplicantProfileView} />}
                        />

                        <Route
                            protected={true}
                            roles={this.roles.ALL}
                            path="/admin/profile/employer/:id"
                            render={(props) => <BaseRoute {...props} component={EmployerProfileView} />}
                        />

                        <BaseRoute path="*" component={() => '404 Not Found'} />
                    </Switch>
                </Router>
            </AppContext.Provider>
        )
    }
}

export default App
