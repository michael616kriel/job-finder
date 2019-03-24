import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppContext } from '../../../components/AppContext'
import './styles.scss'

class Permission extends Component {
    render() {
        const { roles, type } = this.props
        if (roles.includes(type)) {
            return this.props.component
        } else {
            return null
        }
    }
}

class Sidebar extends Component {
    componentDidMount() {
        window.feather.replace()
    }
    render() {
        const type = this.context.user ? this.context.user.type : null
        return (
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <Permission
                            type={type}
                            roles={['admin', 'company', 'recruiter']}
                            component={
                                <li className="nav-item">
                                    <Link to="/admin/dashboard" className="nav-link active">
                                        <span data-feather="monitor" />
                                        Dashboard <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                            }
                        />

                        <Permission
                            type={type}
                            roles={['admin', 'company', 'recruiter']}
                            component={
                                <li className="nav-item">
                                    <Link to="/admin/jobs" className="nav-link">
                                        <span data-feather="award" />
                                        Jobs
                                    </Link>
                                </li>
                            }
                        />

                        <Permission
                            type={type}
                            roles={['applicant', 'company', 'recruiter']}
                            component={
                                <li className="nav-item">
                                    <Link to="/admin/networking" className="nav-link">
                                        <span data-feather="award" />
                                        Networking
                                    </Link>
                                </li>
                            }
                        />

                        <Permission
                            type={type}
                            roles={['applicant', 'company', 'recruiter']}
                            component={
                                <li className="nav-item">
                                    <Link to="/admin/messages" className="nav-link">
                                        <span data-feather="mail" />
                                        Messages
                                    </Link>
                                </li>
                            }
                        />

                        <Permission
                            type={type}
                            roles={['applicant']}
                            component={
                                <li className="nav-item">
                                    <Link to="/admin/applicant/jobs" className="nav-link">
                                        <span data-feather="user" />
                                        Applied Jobs
                                    </Link>
                                </li>
                            }
                        />

                        <Permission
                            type={type}
                            roles={['applicant']}
                            component={
                                <li className="nav-item">
                                    <Link to="/admin/profiles/applicant" className="nav-link">
                                        <span data-feather="user" />
                                        Profile
                                    </Link>
                                </li>
                            }
                        />

                        <Permission
                            type={type}
                            roles={['company']}
                            component={
                                <li className="nav-item">
                                    <Link to="/admin/profiles/company" className="nav-link">
                                        <span data-feather="user" />
                                        Profile
                                    </Link>
                                </li>
                            }
                        />

                        <Permission
                            type={type}
                            roles={['recruiter']}
                            component={
                                <li className="nav-item">
                                    <Link to="/admin/profiles/recruiter" className="nav-link">
                                        <span data-feather="user" />
                                        Profile
                                    </Link>
                                </li>
                            }
                        />

                        {/* <Permission type={type} roles={['applicant', 'company', 'recruiter']} component={
            <li className="nav-item">
              <Link to="/admin/settings" className="nav-link">
                  <span data-feather="award"></span>
                  Settings
              </Link>
            </li>
          } /> */}
                    </ul>
                </div>
            </nav>
        )
    }
}
Sidebar.contextType = AppContext
export default Sidebar
