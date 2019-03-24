import React, { Component } from 'react';
import './styles.scss';
import { BrowserRouter as withRouter, Link, Redirect } from "react-router-dom";
import axios from 'axios'
import Config from '../../../Config'

class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      profile: {
        username: '',
        email: '',
        password: '',
        type: 'applicant'
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeUserType(type) {
    this.state.profile.type = type
    this.setState({
      profile: this.state.profile
    })
  }

  handleChange(event) {
    this.state.profile[event.target.name] = event.target.value
    this.setState({ user: this.state.profile });
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log('user', this.state.profile)
    try {
      const response = await axios.post(`${Config.apiUrl}/${this.state.profile.type}/signup`, this.state.profile);
      console.log('login', response);

      if (response.data === 'user exists') {
        alert('user exists, please login');
      } else if (response.data) {
        localStorage.setItem('authToken', response.data.token)
      }
      this.props.history.push('/login')

    } catch (error) {
      alert('something went wrong');
      console.error('login', error);
    }
  }

  getClass(type) {
    return (this.state.profile.type === type) ? 'primary' : 'secondary'
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card card-signin flex-row my-5">
              <div className="card-img-left d-none d-md-flex">

              </div>
              <div className="card-body">
                <h5 className="card-title text-center">Register</h5>
                <form className="form-signin" onSubmit={this.handleSubmit}>

                  <div className="btn-group" role="group" aria-label="First group">
                    <button onClick={() => this.changeUserType('applicant')} type="button" className={`btn btn-${this.getClass('applicant')}`}>Applicant</button>
                    {/* <button onClick={() => this.changeUserType('recruiter')} type="button"className={`btn btn-${this.getClass('recruiter')}`}>Recruiter</button> */}
                    <button onClick={() => this.changeUserType('employer')} type="button" className={`btn btn-${this.getClass('employer')}`}>Employer</button>
                  </div>


                  <div className="form-label-group">
                    <input onChange={this.handleChange} type="text" name="username" value={this.state.profile.username} type="text" id="inputUserame" className="form-control" placeholder="Username" required autoFocus />
                    <label htmlFor="inputUserame">Username</label>
                  </div>

                  <div className="form-label-group">
                    <input onChange={this.handleChange} type="text" name="email" value={this.state.profile.email} type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>

                  <hr />

                  <div className="form-label-group">
                    <input onChange={this.handleChange} type="text" name="password" value={this.state.profile.password} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    <label htmlFor="inputPassword">Password</label>
                  </div>

                  <div className="form-label-group">
                    <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Password" required />
                    <label htmlFor="inputConfirmPassword">Confirm password</label>
                  </div>

                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                  <Link to="/login" className="d-block text-center mt-2 small">Sign In</Link>
                  {/* <hr className="my-4" />
                  <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit">
                  <i className="fab fa-google mr-2"></i> Sign up with Google</button>
                  <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit">
                  <i className="fab fa-facebook-f mr-2"></i> Sign up with Facebook</button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );


  }
}

export default Signup;
