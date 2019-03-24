import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Layout from '../../../components/admin/layout/index'
import axios from 'axios'
import { AppContext } from '../../../components/AppContext'
import './styles.scss'
import Config from '../../../Config'

class Networking extends Component {
    limit = 4
    offset = 0

    state = {
        networkCount: 0,
        networkUsers: [],
        sentRequests: [],
        pendingRequests: [],
    }

    componentDidMount() {
        this.getFriendRequest()
        this.getUsers()
    }

    async getUsers() {
        try {
            const response = await axios.get(`${Config.apiUrl}/network-users`, {
                params: {
                    uid: this.context.user.uid,
                    limit: this.limit,
                    offset: this.offset,
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            console.log('getUsers', response.data)
            this.setState({
                networkUsers: response.data.users,
                networkCount: response.data.total,
            })
        } catch (error) {
            console.error(error)
        }
    }

    async getUsersNew(limit, offset) {
        try {
            const response = await axios.get(`${Config.apiUrl}/network-users`, {
                params: {
                    uid: this.context.user.uid,
                    limit: limit,
                    offset: offset,
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            console.log('getUsers', response.data)
            this.setState({
                networkUsers: response.data.users,
                networkCount: response.data.count,
            })
        } catch (error) {
            console.error(error)
        }
    }

    async connect(connectUID) {
        const userUID = connectUID
        // console.log('CONNECT WIHT', userUID)
        try {
            const response = await axios.get(`${Config.apiUrl}/network-connect`, {
                params: {
                    uid: this.context.user.uid,
                    connectWith: userUID,
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            // console.log(response.data)
            this.getUsers()
            this.getFriendRequest()
        } catch (error) {
            console.error(error)
        }
    }

    async handleFriendRequest(accept, uid) {
        try {
            const { user } = this.context
            const response = await axios.get(`${Config.apiUrl}/handle-friend-requests`, {
                params: {
                    uid: user.uid,
                    connectWith: uid,
                    accept: accept,
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            // console.log('friend-request', response);
            this.getUsers()
            this.getFriendRequest()
        } catch (error) {
            console.error(error)
        }
    }

    async getFriendRequest() {
        try {
            const { user } = this.context
            const response = await axios.get(`${Config.apiUrl}/friend-requests`, {
                params: { uid: user.uid },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            console.log('getFriendRequest', response)
            const sentRequests = []
            const pendingRequests = []

            if (response.data.friendRequests) {
                for (var k in response.data.friendRequests.pending) {
                    sentRequests.push(response.data.friendRequests.pending[k].uid)
                }
                for (var k in response.data.friendRequests.requests) {
                    pendingRequests.push(response.data.friendRequests.requests[k].uid)
                }
            }

            this.setState({
                sentRequests: sentRequests,
                pendingRequests: pendingRequests,
            })
        } catch (error) {
            console.error(error)
        }
    }

    renderActionButtons(uid) {
        if (this.state.sentRequests.includes(uid)) {
            return (
                <button type="button" className="btn btn-outline-info btn-info">
                    Pending
                </button>
            )
        }
        if (this.state.pendingRequests.includes(uid)) {
            return [
                <button key={1} type="button" className="btn btn-outline-success btn-success" onClick={() => this.handleFriendRequest(true, uid)}>
                    Accept
                </button>,
                <button key={2} type="button" className="btn btn-outline-danger btn-danger" onClick={() => this.handleFriendRequest(false, uid)}>
                    Decline
                </button>,
            ]
        }
        return (
            <button type="button" className="btn btn-outline-secondary" onClick={() => this.connect(uid)}>
                Connect
            </button>
        )
    }

    getProfile(user) {
        let profile = user.profile[user.type][0]
        if (!profile) {
            console.log('INCOMPLETE', user)
            return {
                name: user.username
            }
        }
        if (user.type === 'applicant') {
            return {
                name: (!profile.firstname) ? user.username : `${profile.firstname} ${profile.lastname}`
            }
        }
        if (user.type === 'employer') {
            return {
                name: `${profile.name}`
            }
        }
    }

    profileCard(key, user) {
        const profile = this.getProfile(user)
        return (
            <div key={key} className="col-lg-3 col-sm-6">
                <div className="card hovercard">
                    <div className="cardheader" style={{ 'backgroundImage': `url(${Config.apiUrl}/${user.banner_picture})` }} />
                    <div className="avatar">
                        <img alt="" src={
                            (!user.profile_picture) ? 'https://azouaoui-med.github.io/lightning-admin-angular/demo/assets/img/user.jpg' :
                                `${Config.apiUrl}/${user.profile_picture}`} />
                    </div>
                    <div className="info">
                        <div className="title">
                            <a target="_blank" href="https://scripteden.com/">
                                {profile.name}
                            </a>
                        </div>
                        <div className="desc">{user.uid}</div>
                        <div className="desc">{user.type}</div>
                    </div>
                    <div className="btn-group job-filter" role="group" aria-label="First group">
                        <Link to={`/admin/profile/${user.type}/${user.uid}`} className="btn btn-outline-secondary">
                            View
                        </Link>
                        {this.renderActionButtons(user.uid)}
                    </div>
                </div>
            </div>
        )
    }

    renderNetwork() {
        const network = []
        for (var key in this.state.networkUsers) {
            const user = this.state.networkUsers[key]
            network.push(this.profileCard(key, user))
        }
        return network
    }

    goToNextPage() {
        this.offset = this.offset + this.limit
        this.getUsers()
    }
    goToPrevPage() {
        this.offset = this.offset - this.limit
        this.getUsers()
    }
    goToPage(offset) {
        this.offset = offset * this.limit
        this.getUsers()
    }

    renderPagination() {
        const pages = []
        for (var i = 0; i < this.state.networkCount / this.limit; i++) {
            const index = i
            const classes = index * this.limit === this.offset ? 'page-item active' : 'page-item'
            pages.push(
                <li key={index} className={classes} onClick={() => this.goToPage(index)}>
                    <a className="page-link">{index + 1}</a>
                </li>
            )
        }
        return pages
    }

    renderContent() {
        return (
            <div>
                <div className="row networking">{this.renderNetwork()}</div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {/* <li className="page-item disabled">
                            <a className="page-link" onClick={() => this.goToPrevPage()} tabIndex="-1">
                                Previous
                            </a>
                        </li> */}
                        {this.renderPagination()}
                        {/* <li className="page-item">
                            <a className="page-link" onClick={() => this.goToNextPage()}>
                                Next
                            </a>
                        </li> */}
                    </ul>
                </nav>
            </div>
        )
    }

    render() {
        return <Layout title={'Networking'} content={this.renderContent()} />
    }
}

Networking.contextType = AppContext
export default Networking
