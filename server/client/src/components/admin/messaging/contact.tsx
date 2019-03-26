import React, { Component } from 'react';
import './styles.scss'


class Contact extends Component {
  props: any
  render() {
    return (
      <div {...this.props} className={(this.props.active) ? `chat_list active_chat` : 'chat_list'}>
        <div className="chat_people">
          <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
          <div className="chat_ib">
            <h5>{this.props.data.name} <span className="chat_date">Dec 25</span></h5>
            <p>Test, which is a new approach to have all solutions
                astrology under one roof.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
