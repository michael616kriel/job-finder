import React, { Component } from 'react'
import { AppContext } from '../../../components/AppContext'
import Layout from '../../../components/admin/layout/index'
import axios from 'axios';
import './applicant.style.scss'
import Config from '../../../Config'

class ApplicantProfile extends Component {
    inputProfile: any;
    inputBanner: any;
    state: any = {
        file: '',
        uploading: 0,
        uploadProgress: 0,
        profile: {
            firstname: '',
            lastname: '',
            contact: '',
            job_title: '',
            about: '',
            skills: [],
            experience: [],
            education: []
        },
        skillField: '',
        experience: {
            company: '',
            responsibility: '',
            position: '',
            from: '',
            to: '',
        },
        education: {
            school: '',
            qualification: '',
            graduation: ''
        }
    }
    constructor(props: any) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.skillFieldChange = this.skillFieldChange.bind(this)

        this.handleSubmit2 = this.handleSubmit2.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    componentWillMount() {
        this.getApplicant()
    }

    handleChange(name: any, event: any) {
        if (!name) {
            let data: any = {}
            data[event.target.name] = event.target.value
            this.setState(data)
        } else {
            this.state[name][event.target.name] = event.target.value
            let data: any = {}
            data[name] = this.state[name]
            this.setState(data)
        }
    }

    async handleSubmit(event: any) {
        event.preventDefault()
        try {
            const response = await axios.get(`${Config.apiUrl}/applicant/update`, {
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

    async getApplicant() {
        try {
            const response: any = await axios.get(`${Config.apiUrl}/applicant/get`, {
                params: {
                    uid: this.context.user.uid,
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

    skillFieldChange(event: any) {
        this.setState({ skillField: event.target.value })
    }

    renderSkills() {
        const newSkills = []
        const { skills } = this.state.profile
        for (let i = 0; i < skills.length; i++) {
            let skill = this.state.profile.skills[i]
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


    renderExperience() {
        const newExperience = []
        const { experience } = this.state.profile
        for (let i = 0; i < experience.length; i++) {
            let item = experience[i]
            newExperience.push(
                <a className="list-group-item list-group-item-action flex-column align-items-start" key={i}>
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{item.company}</h5>
                        <small>{item.from} - {item.to}</small>
                        <span className="badge badge-light ml-3" onClick={() => this.removeExperience(i)}>
                            <i className="fa fa-times" />
                        </span>
                    </div>
                    <small>Retail</small>
                    <hr />
                    {item.responsibility}

                </a>
            )
        }
        return newExperience
    }

    renderEducation() {
        const newEducatiob = []
        const { education } = this.state.profile
        for (let i = 0; i < education.length; i++) {
            let item = education[i]
            newEducatiob.push(
                <a key={i} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{item.qualification}</h5>
                        <small>{item.graduation}</small>
                        <span className="badge badge-light ml-3" onClick={() => this.removeEducation(i)}>
                            <i className="fa fa-times" />
                        </span>
                    </div>
                    <hr />
                    <p className="mb-1">{item.school}</p>

                </a>
            )
        }
        return newEducatiob
    }

    addEducation() {
        this.state.profile.education.push(this.state.education)
        this.setState({
            education: {
                school: '',
                qualification: '',
                graduation: ''
            },
            profile: this.state.profile
        })
    }

    addExperience() {
        this.state.profile.experience.push(this.state.experience)
        this.setState({
            experience: {
                company: '',
                responsibility: '',
                position: '',
                from: '',
                to: ''
            },
            profile: this.state.profile
        })
    }

    addSkill() {
        this.state.profile.skills.push(this.state.skillField)
        this.state.skillField = ''
        this.setState({
            skillField: '',
            profile: this.state.profile,
        })
    }

    removeSkill(index: any) {
        console.log('index', index)
        this.state.profile.skills.splice(index, 1)
        this.setState({
            profile: this.state.profile,
        })
    }

    removeEducation(index: any) {
        console.log('index', index)
        this.state.profile.education.splice(index, 1)
        this.setState({
            profile: this.state.profile,
        })
    }

    removeExperience(index: any) {
        console.log('index', index)
        this.state.profile.experience.splice(index, 1)
        this.setState({
            profile: this.state.profile,
        })
    }

    fileUpload(file: any, type: any) {
        const url = `${Config.apiUrl}/upload/` + type;
        const formData = new FormData();
        formData.append(type, file)
        formData.append('uid', this.context.user.uid)
        const scope: any = this
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            onUploadProgress: function (progressEvent: any) {
                const loaded: number = progressEvent.loaded
                const total: number = progressEvent.total
                let uploadPercentage: number = Math.round((loaded * 100) / total);
                scope.setState({ uploadProgress: uploadPercentage })

            }.bind(this)
        }
        return axios.post(url, formData, config)
    }

    handleSubmit2(e: any) {
        // e.preventDefault()
        // console.log('SUBMIT', e)
        // this.setState({ uploading: true })
        // this.fileUpload(this.state.file).then((response) => {
        //     console.log(response.data);
        //     this.setState({ uploading: false })
        // })
    }


    async onChange(e: any) {
        // this.setState({ file: e.target.files[0] })
        console.log('SUBMIT', e)
        this.setState({ uploading: true })
        this.fileUpload(e.target.files[0], e.target.name).then((response: any) => {
            console.log(response.data);
            this.setState({
                uploading: false
            })
        })
    }

    selectProfile() {
        this.inputProfile.click()
    }

    selectBanner() {
        this.inputBanner.click()
    }

    profile() {
        const { skillField } = this.state

        return (
            <div>

                <div className="row mb-3">
                    <div className="col-3">

                        <div className="card profile-card" style={{ 'height': '100%' }}>
                            <div className="card-body text-center">
                                <div className="header-image" style={{ 'backgroundImage': `url(http://localhost:3001/${this.state.profile.banner_picture})` }}></div>
                                <img src={
                                    (!this.state.profile_picture) ? 'https://azouaoui-med.github.io/lightning-admin-angular/demo/assets/img/user.jpg' :
                                        `http://localhost:3001/${this.state.profile_picture}`} alt="..."
                                    className="rounded-circle mx-auto d-block" />
                                <div className="btn-group btn-group-sm mt-3 special" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-primary" onClick={() => this.selectProfile()}>Profile</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => this.selectBanner()}>Banner</button>
                                </div>
                                <div className="progress mt-2" style={{ 'opacity': (this.state.uploading) ? 1 : 0 }}>
                                    <div className="progress-bar bg-success" role="progressbar" style={{ 'width': `${this.state.uploadProgress}%` }}></div>
                                </div>
                                <hr />
                                <small>michael61asdasd</small><br />
                                <small>michael61asdasd@gmail.com</small>

                                <input ref={input => this.inputProfile = input} style={{ 'visibility': 'hidden' }} type="file" name="profile" onChange={this.onChange} />
                                <input ref={input => this.inputBanner = input} style={{ 'visibility': 'hidden' }} type="file" name="banner" onChange={this.onChange} />
                            </div>
                        </div>

                    </div>
                    <div className="col-9">

                        <div className="card">
                            <div className="card-body">

                                <h5 className="card-title">Personal Info</h5>
                                <hr />
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Firstname</label>
                                        <input
                                            onChange={(e) => this.handleChange('profile', e)}
                                            type="text"
                                            name="firstname"
                                            value={this.state.profile.firstname}
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            placeholder="Firstname"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Lastname</label>
                                        <input
                                            onChange={(e) => this.handleChange('profile', e)}
                                            type="text"
                                            name="lastname"
                                            value={this.state.profile.lastname}
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            placeholder="Lastname"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Job Title</label>
                                        <input
                                            onChange={(e) => this.handleChange('profile', e)}
                                            type="text"
                                            name="job_title"
                                            value={this.state.profile.job_title}
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            placeholder="Job Title"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Contact Number</label>
                                        <input
                                            onChange={(e) => this.handleChange('profile', e)}
                                            type="text"
                                            name="contact"
                                            value={this.state.profile.contact}
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            placeholder="Contact Number"
                                        />
                                    </div>
                                </div>

                                <h5 className="card-title">About</h5>
                                <textarea onChange={(e) => this.handleChange('profile', e)}
                                    name="about"
                                    value={this.state.profile.about} className="form-control"></textarea>

                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={this.handleSubmit}>

                    <h5>Skills</h5>
                    <div className="card mb-3 mt-3">
                        <div className="card-body">

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

                            <hr />

                            {this.renderSkills()}

                        </div>
                    </div>

                    <h5>Experience</h5>
                    <div className="card mb-3 mt-3">
                        <div className="card-body">

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Company</label>
                                    <input onChange={(e) => this.handleChange('experience', e)}
                                        type="text"
                                        value={this.state.experience.company}
                                        name="company" className="form-control" id="inputEmail4" placeholder="Company" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Position</label>
                                    <input onChange={(e) => this.handleChange('experience', e)}
                                        type="text"
                                        value={this.state.experience.position}
                                        name="position" className="form-control" id="inputPassword4" placeholder="Position" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">From</label>
                                    <input onChange={(e) => this.handleChange('experience', e)}
                                        type="text"
                                        value={this.state.experience.from}
                                        name="from" className="form-control" id="inputEmail4" placeholder="From" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">To</label>
                                    <input onChange={(e) => this.handleChange('experience', e)}
                                        type="text"
                                        value={this.state.experience.to}
                                        name="to" className="form-control" id="inputPassword4" placeholder="To" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail4">Responsibility</label>
                                    <input onChange={(e) => this.handleChange('experience', e)}
                                        type="text"
                                        value={this.state.experience.responsibility}
                                        name="responsibility" className="form-control" id="inputEmail4" placeholder="Responsibility" />
                                </div>
                            </div>
                            <button className="btn btn-primary" type="button" onClick={() => this.addExperience()}>Add Experience</button>


                            <hr />

                            <div className="list-group">
                                {this.renderExperience()}
                            </div>

                        </div>
                    </div>

                    <h5>Education</h5>
                    <div className="card mb-3 mt-3">
                        <div className="card-body">



                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">School</label>
                                    <input onChange={(e) => this.handleChange('education', e)}
                                        type="text"
                                        value={this.state.education.school}
                                        name="school" className="form-control" id="inputEmail4" placeholder="School" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Qualification</label>
                                    <input onChange={(e) => this.handleChange('education', e)}
                                        type="text"
                                        value={this.state.education.qualification}
                                        name="qualification" className="form-control" id="inputPassword4" placeholder="Qualification" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail4">Graduation</label>
                                    <input onChange={(e) => this.handleChange('education', e)}
                                        type="text"
                                        value={this.state.education.graduation}
                                        name="graduation" className="form-control" id="inputEmail4" placeholder="Graduation" />
                                </div>
                            </div>
                            <button className="btn btn-primary" type="button" onClick={() => this.addEducation()}>Add Education</button>


                            <hr />

                            <div className="list-group">
                                {this.renderEducation()}
                            </div>


                        </div>
                    </div>
                    <button className="btn btn-primary mb-3" type="submit">
                        Update
                </button>


                </form>
            </div>
        )
    }


    render() {
        return <Layout title={'Profile'} content={this.profile()} />
    }
}

ApplicantProfile.contextType = AppContext
export default ApplicantProfile
