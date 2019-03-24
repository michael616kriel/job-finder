import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppContext } from '../../../components/AppContext'
import './styles.scss'

class Topbar extends Component {
    state = {
        friendRequests: [],
    }

    componentDidMount() {
        this.getFriendRequest()
    }

    async getFriendRequest() {
        try {
            const { user } = this.context
            const response = await axios.get('http://localhost:3001/friend-requests', {
                params: { uid: user.uid },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            // console.log('friend-request', response)
            this.setState({ friendRequests: response.data.userData })
        } catch (error) {
            console.error(error)
        }
    }

    async handleFriendRequest(accept, uid) {
        try {
            const { user } = this.context
            const response = await axios.get('http://localhost:3001/handle-friend-requests', {
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

            for (var k in this.state.friendRequests) {
                if (this.state.friendRequests[k].uid === uid) {
                    this.state.friendRequests.splice(k, 1)
                }
            }
            this.setState({ friendRequests: this.state.friendRequests })
        } catch (error) {
            console.error(error)
        }
    }

    logout() {
        this.context.logout()
        this.context.history.push('/')
    }

    renderFriendRequests() {
        const list = []
        for (var key in this.state.friendRequests) {
            const friend = this.state.friendRequests[key]
            list.push(
                <a className="dropdown-item friend-request" href="#" key={key}>
                    <div className="row">
                        <div className="col-2">
                            <img className="rounded-circle" alt="75x75" src="http://lorempixel.com/100/100/people/9/" />
                        </div>
                        <div className="col-7">
                            {friend.username}
                            <br />
                            {friend.uid}
                            <br />
                        </div>
                        <div className="col-3">
                            <div className="btn-group btn-group-sm" role="group" aria-label="First group">
                                <button
                                    onClick={() => this.handleFriendRequest(true, friend._id)}
                                    type="button"
                                    className="btn btn-outline-secondary btn-success"
                                >
                                    <i className="fas fa-check" />
                                </button>
                                <button
                                    onClick={() => this.handleFriendRequest(false, friend._id)}
                                    type="button"
                                    className="btn btn-outline-secondary btn-danger"
                                >
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                    </div>
                </a>
            )
        }
        return list
    }

    render() {
        return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <Link to="/" className="navbar-brand col-sm-3 col-md-2 mr-0">
                    Job Finder
                </Link>
                <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
                <ul className="nav px-3 mr-auto w-25 justify-content-end">
                    {/* <li className="nav-item">
              <span className="badge badge-pill badge-primary" style={{float:'right', marginBottom:'-10px'}}>1</span> 
              <a className="nav-link text-white"><i className="fas fa-users"></i> <span className="sr-only">(current)</span></a>
          </li> */}
                    <li className="nav-item dropdown">
                        <span className="badge badge-pill badge-primary" style={{ float: 'right', marginBottom: '-10px' }}>
                            {this.state.friendRequests.length}
                        </span>
                        <a
                            className="nav-link dropdown-toggle text-white"
                            href="#"
                            id="dropdown06"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fas fa-users" />
                        </a>
                        <div className="dropdown-menu friend-dropdown text-white" aria-labelledby="dropdown06">
                            {this.renderFriendRequests()}
                        </div>
                    </li>
                    <li className="nav-item text-nowrap">
                        <a className="nav-link text-white" onClick={() => this.logout()}>
                            Sign out
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}
Topbar.contextType = AppContext
export default Topbar
