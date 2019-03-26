import React, { Component } from 'react';
import './styles.scss';
import { BrowserRouter as withRouter, Link, Redirect } from "react-router-dom";
import axios from 'axios'
import { AppContext } from "../../../components/AppContext";
import Config from '../../../Config'

class Login extends Component {

  props: any
  state: any = {
    showError: false,
    user: {
      username: '',
      password: ''
    }
  };

  constructor(props: any) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
  }

  handleChange(event: any) {
    this.state.user[event.target.name] = event.target.value
    this.setState({ user: this.state.user });
  }

  async handleSubmit(event: any) {
    event.preventDefault();
    try {
      const response = await axios.post(`${Config.apiUrl}/auth/login`, this.state.user);
      const { userObject, token } = response.data
      localStorage.setItem('authToken', token)
      this.context.setUser(userObject)
      console.log('LOGGED USER', response.data)


      this.props.history.push(`/admin/profiles/${userObject.type}`)

    } catch (error) {
      this.setState({ showError: true })
      console.log('login', error);
    }

  }

  renderError() {
    return (this.state.showError) ?
      (<div className="alert alert-danger" role="alert">
        wrong credentials or user doesnt exist
    </div>) :
      (<span></span>)
  }

  render() {


    return (
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Welcome back!</h3>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-label-group">
                        <input onChange={this.handleChange} value={this.state.user.username} name="username" type="text" id="inputEmail" className="form-control" placeholder="Username" required autoFocus />
                        <label htmlFor="inputEmail">Username</label>
                      </div>

                      <div className="form-label-group">
                        <input onChange={this.handleChange} value={this.state.user.password} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                        <label htmlFor="inputPassword">Password</label>
                      </div>

                      <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                      </div>

                      <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>
                      {this.renderError()}
                      <div className="text-center">
                        <Link to="/signup" className="d-block text-center mt-2 small">Sign Up</Link>
                        <a className="small" href="#">Forgot password?</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );


  }
}
Login.contextType = AppContext
export default Login;
