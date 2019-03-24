import React, { Component } from 'react';
import './style.scss'


class Title extends Component {
  render() {
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-2 border-bottom">
        <h3 className="text-muted mb-4">{this.props.text}</h3>
        {this.props.toolbar}
      </div>
    );
  }
}

export default Title;
