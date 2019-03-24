import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Layout from '../../../components/admin/layout/index'
import axios from 'axios'

import './styles.scss';

class Settings extends Component {

	state = {

	}

	componentDidMount() {

	}


	renderContent() {
		return <div className="row">
			<div className="col-md-3 ">
				<div className="list-group ">
					<a href="#" className="list-group-item list-group-item-action active">Account</a>
					<a href="#" className="list-group-item list-group-item-action">Privacy</a>
					<a href="#" className="list-group-item list-group-item-action">Payment</a>
					<a href="#" className="list-group-item list-group-item-action">Preferences</a>
				</div>
			</div>
			<div className="col-md-9">
				<div className="card">
					<div className="card-body">
						<div className="row">
							<div className="col-md-12">
								<h4>My Account</h4>
								<hr />
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<form></form>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	}


	render() {
		return (<Layout title={"Settings"} content={this.renderContent()} />);
	}
}

export default Settings;
