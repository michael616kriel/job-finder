import React, { Component } from 'react'
import axios from 'axios'
import Layout from '../../../components/admin/layout/index'
import { AppContext } from '../../../components/AppContext'
import './styles.scss'
import Config from '../../../Config'

class AdminJobs extends Component {
    props: any
    state: any = {
        job: {
            title: '',
            description: '',
            requirements: '',
            responsibility: '',
            location: '',
            company: '',
            salary: '',
            industry: '',
            skills: [],
        },
        skillField: '',
    }
    constructor(props: any) {
        super(props)


        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.skillFieldChange = this.skillFieldChange.bind(this)
    }

    componentDidMount() {
        console.log('componentDidMount', this.props)
    }

    skillFieldChange(event: any) {
        this.setState({ skillField: event.target.value })
    }

    handleChange(event: any) {
        this.state.job[event.target.name] = event.target.value
        this.setState({ job: this.state.job })
    }

    async handleSubmit(event: any) {
        event.preventDefault()
        try {
            const dataClone = Object.assign(this.state.job, {})
            dataClone.owner_uid = this.context.user.uid
            const response = await axios.get(`${Config.apiUrl}/jobCreate`, {
                params: dataClone,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            this.props.history.push(`/admin/edit-job/${response.data._id}`)
            console.log(response.data)
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

    removeSkill(index: any) {
        console.log('index', index)
        this.state.job.skills.splice(index, 1)
        this.setState({
            job: this.state.job,
        })
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
                    <label>Industry</label>
                    <textarea name="industry" value={job.industry} className="form-control" onChange={this.handleChange} />
                </div>

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
                    Create
                </button>
            </form>
        )
    }

    render() {
        return <Layout title={'New Job'} content={this.renderContent()} />
    }
}

AdminJobs.contextType = AppContext
export default AdminJobs
