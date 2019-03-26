import React, { Component } from 'react'
import { AppContext } from '../../../components/AppContext'
import Layout from '../../../components/admin/layout/index'
import axios from 'axios'
import './employer.style.scss'
import Config from '../../../Config'

class EmployerProfile extends Component {
    state: any = {
        profile: {
            name: '',
            website: '',
            address: '',
            contact: '',
            slogan: '',
            industry: '',
            email: '',
            logo: '',
        },
    }
    constructor(props: any) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.getEmployer()
    }

    handleChange(event: any) {
        this.state.profile[event.target.name] = event.target.value
        this.setState({ profile: this.state.profile })
    }

    async handleSubmit(event: any) {
        event.preventDefault()
        try {
            const response = await axios.get(`${Config.apiUrl}/employer/update`, {
                params: {
                    uid: this.context.user.uid,
                    data: JSON.stringify(this.state.profile),
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    async getEmployer() {
        try {
            const { user, authenticated } = this.context
            const response: any = await axios.get(`${Config.apiUrl}/employer/get`, {
                params: {
                    uid: user.uid,
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            console.log('GET', response)
            for (var key in response.data) {
                if (key !== '_v' || response !== '_id') {
                    this.state.profile[key] = response.data[key]
                }
            }

            this.setState({ profile: this.state.profile })
        } catch (error) {
            console.error(error)
        }
    }

    renderContent() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Company Name</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="name"
                            value={this.state.profile.name}
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Company Name"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Website</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="website"
                            value={this.state.profile.website}
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="website"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Physical Address</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="address"
                            value={this.state.profile.address}
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Physical Address"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Contact</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="contact"
                            value={this.state.profile.contact}
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Contact Number"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input type="text" className="form-control" id="inputCity" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">State</label>
                        <select id="inputState" className="form-control">
                            <option>Choose...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input type="text" className="form-control" id="inputZip" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="email"
                            value={this.state.profile.email}
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Logo</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="logo"
                            value={this.state.profile.logo}
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Logo"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Slogan</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="slogan"
                            value={this.state.profile.slogan}
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Slogan"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Industry</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="industry"
                            value={this.state.profile.industry}
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Industry"
                        />
                    </div>
                </div>

                <button className="btn btn-primary" type="submit">
                    Update
                </button>
            </form>
        )
    }

    render() {
        return <Layout title={'Profile'} content={this.renderContent()} />
    }
}

EmployerProfile.contextType = AppContext
export default EmployerProfile
