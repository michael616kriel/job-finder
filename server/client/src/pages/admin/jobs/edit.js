import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppContext } from '../../../components/AppContext'
import Layout from '../../../components/admin/layout/index'
import axios from 'axios'
import './styles.scss'
import Config from '../../../Config'

class EditJobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            job: {
                title: '',
                description: '',
                requirements: '',
                responsibility: '',
                location: '',
                company: '',
                salary: '',
                skills: [],
            },
            skillField: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.skillFieldChange = this.skillFieldChange.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
        this.getJob()
    }

    skillFieldChange(event) {
        this.setState({ skillField: event.target.value })
    }

    handleChange(event) {
        this.state.job[event.target.name] = event.target.value
        this.setState({ job: this.state.job })
    }

    async getJob() {
        const { match } = this.props
        try {
            const response = await axios.get(`${Config.apiUrl}/job/${match.params.id}`)
            console.log('GET', response)
            const skillSet = (response.data.skills) ? response.data.skills.split(',') : []
            response.data.skills = skillSet
            this.setState({ job: response.data })
        } catch (error) {
            console.error(error)
        }
    }

    async handleSubmit(event) {
        event.preventDefault()
        try {
            const dataClone = Object.assign(this.state.job, {})
            dataClone.owner_uid = this.context.user.uid
            const response = await axios.get(`${Config.apiUrl}/jobUpdate/`, {
                params: {
                    data: dataClone,
                    id: this.props.match.params.id
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

    renderSkills() {
        const newSkills = []
        const { skills } = this.state.job
        for (let i = 0; i < skills.length; i++) {
            let skill = this.state.job.skills[i]
            newSkills.push(
                <button type="button" className="btn btn-primary mr-3 mb-3" key={i}>
                    {skill}
                    <span className="badge badge-light ml-3" onClick={() => this.removeSkill(i)}>
                        <i className="fa fa-times" />
                    </span>
                </button>
            )
        }
        return newSkills
    }

    addSkill() {
        this.state.job.skills.push(this.state.skillField)
        this.state.skillField = ''
        this.setState({
            skillField: '',
            job: this.state.job,
        })
    }

    removeSkill(index) {
        console.log('index', index)
        this.state.job.skills.splice(index, 1)
        this.setState({
            job: this.state.job,
        })
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
        const { job, skillField } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                onChange={this.handleChange}
                                value={job.title}
                                type="text"
                                name="title"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="Enter a Title..."
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Salary</label>
                            <input
                                onChange={this.handleChange}
                                value={job.salary}
                                type="text"
                                name="salary"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="Enter a Salary..."
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>location</label>
                    <input
                        onChange={this.handleChange}
                        value={job.location}
                        type="text"
                        name="location"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter a Location..."
                    />
                </div>

                <div className="form-group">
                    <label>Company</label>
                    <input
                        onChange={this.handleChange}
                        value={job.company}
                        type="text"
                        name="company"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter a Company..."
                    />
                </div>

                <label>Skills</label>
                <div className="input-group mb-3">
                    <input
                        onChange={this.skillFieldChange}
                        value={skillField}
                        type="text"
                        className="form-control"
                        placeholder="Enter a Skill..."
                        aria-label="requirements"
                        aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.addSkill()}>
                            Add Skill
                        </button>
                    </div>
                </div>
                {this.renderSkills()}
                <hr />

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={job.description} className="form-control" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Requirements</label>
                    <textarea name="requirements" value={job.requirements} className="form-control" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Responsibilities</label>
                    <textarea name="responsibility" value={job.responsibility} className="form-control" onChange={this.handleChange} />
                </div>
                <button className="btn btn-primary" type="submit">
                    Update
                </button>
            </form>
        )
    }

    render() {
        return <Layout title={'Edit Job'} content={this.renderContent()} toolbar={this.renderToolbar()} />
    }
}

EditJobs.contextType = AppContext
export default EditJobs
