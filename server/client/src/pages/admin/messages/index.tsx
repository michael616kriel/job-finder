import React, { Component } from 'react'
import Layout from '../../../components/admin/layout/index'
import Messaging from '../../../components/admin/messaging'
import { AppContext } from '../../../components/AppContext'
import axios from 'axios'
import io from 'socket.io-client'
import Config from '../../../Config'
import './styles.scss'

class Messages extends Component {
    socket: any = null

    state: any = {
        selectedContact: null,
        message: '',
        contacts: [
            // { name : 'Mike', uid : 'uid1' },
            // { name : 'Sam', uid : 'uid2' },
            // { name : 'Peter', uid : 'uid3' }
        ],
        messages: [
            // { incoming : true },
            // { incoming : false },
        ],
    }

    constructor(props: any) {
        super(props)
        this.socket = io(Config.socketUrl)
    }

    handleChange(event: any) {
        this.state.message = event.target.value
        this.setState({ message: this.state.message })
    }

    componentDidMount() {
        const scope = this

        this.socket.on('receive-message', function (data: any) {
            console.log('receive-message', data)
            if (data) {
                scope.setState({ messages: data.messages })
            }

        })

        this.socket.on('contact-change', function (data: any) {
            console.log('contact-change', data)
            scope.setState({ messages: data.messages })
        })

        this.getNetwork()
    }

    componentWillUnmount() {
        this.socket.off('receive-message')
        this.socket.off('contact-change')
    }

    send() {
        this.socket.emit('message', {
            uid: this.context.user.uid,
            contactID: this.state.selectedContact,
            message: this.state.message,
        })
    }

    selectContact(uid: any) {
        this.setState({ selectedContact: uid, message: [] })
        this.socket.emit('select-contact', {
            contactID: uid,
            uid: this.context.user.uid,
        })
    }

    async getNetwork() {
        try {
            const { user } = this.context
            const response = await axios.get(`${Config.apiUrl}/my-network`, {
                params: { uid: user.uid },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
            })
            // console.log('getNetwork', response.data);
            let data = []
            for (var k in response.data) {
                data.push({ name: response.data[k].username, uid: response.data[k]._id })
            }
            this.setState({ contacts: data })
        } catch (error) {
            console.error(error)
        }
    }

    renderContent() {
        return (
            <div>
                <Messaging
                    canChat={this.state.selectedContact !== null}
                    handleChange={(e: any) => this.handleChange(e)}
                    onSend={() => {
                        this.send()
                    }}
                    onContactSelect={(uid: any) => {
                        console.log('SELECT', uid)
                        this.selectContact(uid)
                    }}
                    messages={this.state.messages}
                    contacts={this.state.contacts}
                />
            </div>
        )
    }

    render() {
        return <Layout title={'Messages'} fill={true} content={this.renderContent()} />
    }
}
Messages.contextType = AppContext
export default Messages
