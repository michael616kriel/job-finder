import React, { Component } from 'react'
import Title from '../title/index'
import { AppContext } from '../../../components/AppContext'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
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

class Layout extends Component {

  state = {
    toggled: false,
    didInit: false
  }

  componentWillMount() {

  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ didInit: true })
    }, 500)
  }

  toggleSidebar() {
    this.setState({
      toggled: !this.state.toggled
    })
  }

  logout() {
    this.context.logout()
    this.context.history.push('/')
  }

  getRootClasses() {
    let rootClasses = 'wrapper default-theme'
    if (this.state.toggled) {
      rootClasses += ' pinned-sidebar'
    }
    if (!this.state.didInit) {
      rootClasses += ' no-animation'
    }
    return rootClasses
  }

  render() {
    const type = this.context.user ? this.context.user.type : null
    return <div className={this.getRootClasses()}>
      <nav className="navbar navbar-expand-md fixed-top navbar-dark flex-fill">

        <div className="sidebar-toggler ml-4">
          <a className="btn nav-link"><i className="fas fa-bars"></i></a>
        </div>
        {/* <!-- header --> */}
        <div className="navbar-header pl-2 pr-2 text-center">
          <Link to="/" className="navbar-brand m-0 text-uppercase w-100">
            <span className="ml-1 brand-text">Job Finder</span>
            <span className="ml-1 brand-logo"><i className="fas fa-list"></i></span>
          </Link>
        </div>
        {/* <!-- left box --> */}
        <ul className="navbar-nav flex-fill mt-1 align-items-center left-nav">
          <li className="nav-item navicon" onClick={() => this.toggleSidebar()}>
            <a className="btn nav-link"><i className="fas fa-bars"></i></a>
          </li>
          <li className="nav-item flex-fill">
            <input className="form-control navbar-search" type="text" placeholder="Search" />
          </li>
        </ul>
        {/* <!-- right menu toggler --> */}
        <div className="nav-toggler-right mr-4 d-md-none">
          <button className="" type="button" aria-controls="collapseBasic">
            <img src="https://azouaoui-med.github.io/lightning-admin-angular/demo/assets/img/user.jpg" className="img-fluid" alt="" />
          </button>
          <span className="nav-alert bg-danger"></span>
        </div>
        {/* <!-- right menu --> */}
        <div className="collapse navbar-collapse right-nav" id="collapseBasic">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="btn nav-link">
                <i className="fas fa-bell"></i>
                <span className="link-text">Alerts</span>
                {/* <!-- <span className="badge badge-pill ba dge-danger">3</span> --> */}
                <span className="nav-alert bg-danger"></span>
              </a>
            </li>
            <li className="nav-item">
              <a className="btn nav-link">
                <i className="fas fa-envelope"></i>
                <span className="link-text">Messages</span>
                {/* <span className="badge badge-pill badge-success">5</span> */}
                <span className="nav-alert bg-success"></span>
              </a>
            </li>
            <li className="nav-item">
              <a className="btn nav-link">
                <i className="fas fa-user"></i>
                <span className="link-text">Friend Requests</span>
                <span className="nav-alert bg-success"></span>
              </a>
            </li>
            <li className="nav-item">
              <a className="btn nav-link" onClick={() => this.logout()}>
                <i className="fas fa-sign-out-alt"></i>
                <span className="link-text">Logout</span>
              </a>
            </li>
          </ul>
        </div>



      </nav >
      <main>
        <aside className="sidebar shadow-sm">
          <div className="sidebar-profile d-flex flex-column justify-content-center pt-5 pb-3">
            <div className="picture-wrapper mb-4">
              <div className="user-picture m-auto">
                <img alt="" className="img-fluid" src="https://azouaoui-med.github.io/lightning-admin-angular/demo/assets/img/user.jpg" />
              </div>
            </div>
            <div className="profile-details text-center pb-4">
              <p className="mb-0 text-uppercase name">Ahmed Amine</p>
              <small className="text-uppercase role">Web Developer</small>
            </div>
          </div>
          <div className="sidebar-search pt-1 pb-1 pl-3 pr-3">
            <input className="form-control rounded-pill" name="search" placeholder="Search ..." type="search" />
          </div>
          <nav className="sidebar-menu pt-3 pb-3">
            <ul>

              <Permission
                type={type}
                roles={['admin', 'employer']}
                component={
                  <li>
                    <Link to="/admin/dashboard">
                      <i className="fa fa-tv"></i><span>Dashboard</span>
                      {/* <span className="badge badge-danger rounded-0 ml-auto text-light">New</span> */}
                    </Link>
                  </li>
                }
              />

              <Permission
                type={type}
                roles={['admin', 'employer']}
                component={
                  <li>
                    <Link to="/admin/jobs">
                      <i className="fa fa-hammer"></i><span>Jobs</span>
                      {/* <span className="badge badge-danger rounded-0 ml-auto text-light">New</span> */}
                    </Link>

                  </li>
                }
              />

              <Permission
                type={type}
                roles={['applicant', 'employer']}
                component={
                  <li>
                    <Link to="/admin/networking">
                      <i className="fa fa-network-wired"></i><span>Networking</span>
                      <span className="badge badge-danger rounded-0 ml-auto text-light">New</span>
                    </Link>
                  </li>
                }
              />

              <Permission
                type={type}
                roles={['applicant', 'employer']}
                component={
                  <li>
                    <Link to="/admin/messages">
                      <i className="fa fa-envelope-open-text"></i><span>Messages</span>
                      {/* <span className="badge badge-danger rounded-0 ml-auto text-light">New</span> */}
                    </Link>
                  </li>
                }
              />

              <Permission
                type={type}
                roles={['applicant']}
                component={
                  <li>
                    <Link to="/admin/applicant/jobs">

                      <i className="fa fa-bookmark"></i><span>Applied Jobs</span>
                      {/* <span className="badge badge-danger rounded-0 ml-auto text-light">New</span> */}
                    </Link>
                  </li>
                }
              />

              <Permission
                type={type}
                roles={['applicant']}
                component={
                  <li>
                    <Link to="/admin/profiles/applicant">
                      <i className="fa fa-address-book"></i><span>Profile</span>
                      {/* <span className="badge badge-danger rounded-0 ml-auto text-light">New</span> */}
                    </Link>
                  </li>
                }
              />

              <Permission
                type={type}
                roles={['employer']}
                component={
                  <li>
                    <Link to="/admin/profiles/employer">
                      <i className="fa fa-address-book"></i><span>Profile</span>
                      {/* <span className="badge badge-danger rounded-0 ml-auto text-light">New</span> */}
                    </Link>
                  </li>
                }
              />

            </ul>
          </nav>
        </aside>
        <div className={`pages ${(this.props.fill) ? 'container-fill' : 'pt-4 pb-4 pl-4 pr-4'}`}>
          {(!this.props.fill) ? <Title text={this.props.title} toolbar={this.props.toolbar} /> : ''}
          {this.props.content}
        </div>
      </main >
    </ div >
  }
}

Layout.contextType = AppContext
export default Layout
