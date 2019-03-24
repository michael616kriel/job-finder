import React, { Component } from 'react';
import axios from 'axios'
import { AppContext } from "../../../components/AppContext";
import Message from './message'
import Contact from './contact'

import './styles.scss';

class Messaging extends Component {

  componentDidMount() {

  }

  renderContacts() {
    let contacts = []
    for (var key in this.props.contacts) {
      const id = this.props.contacts[key].uid
      contacts.push(<Contact data={this.props.contacts[key]} onClick={() => this.props.onContactSelect(id)} key={key} />)
    }
    return contacts
  }

  renderMessages() {
    let messages = []
    for (var key in this.props.messages) {
      let message = this.props.messages[key]
      messages.push(<Message key={key} incoming={(message.owner !== this.context.user.uid)} message={message.message} />)
    }
    if (messages.length > 0) {
      return messages
    } else {
      return (<div className="message-badge">no messages yet.</div>)
    }

  }

  renderUserMessage() {
    if (this.props.canChat) {
      return null
    } else {
      return (
        <div className="select-chat-message">
          <p>Select a contact...</p>
        </div>
      )
    }
  }

  handleChange(event) {
    this.props.handleChange(event)
  }

  render() {
    return <div className="messaging">
      <div className="inbox_msg">
        <div className="inbox_people">
          <div className="headind_srch">
            <div className="srch_bar">
              <div className="stylish-input-group">
                <input type="text" className="search-bar" placeholder="Search" />
                <span className="input-group-addon">
                  <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                </span> </div>
            </div>
          </div>
          <div className="inbox_chat">
            {this.renderContacts()}
          </div>
        </div>
        <div className="mesgs">
          {this.renderUserMessage()}
          <div className="msg_history">
            {this.renderMessages()}
          </div>
          <div className="type_msg">
            <div className="input_msg_write">
              <input onChange={(e) => this.handleChange(e)} type="text" className="write_msg" placeholder="Type a message" />
              <button onClick={this.props.onSend} className="msg_send_btn" type="button"><i className="fas fa-paper-plane" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>

    </div>
  }

}
Messaging.contextType = AppContext
export default Messaging;
