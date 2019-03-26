import React, { Component } from 'react';
import './styles.scss'

class Message extends Component {
    props: any
    incoming() {
        return (
            <div className="incoming_msg">
                <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{this.props.message}</p>
                        <span className="time_date"> 11:01 AM    |    June 9</span></div>
                </div>
            </div>
        )
    }

    outgoing() {
        return (
            <div className="outgoing_msg">
                <div className="sent_msg">
                    <p>{this.props.message}</p>
                    <span className="time_date"> 11:01 AM    |    June 9</span> </div>
            </div>
        )
    }

    render() {
        return (this.props.incoming) ? this.incoming() : this.outgoing()
    }
}

export default Message;
