import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Layout from '../../../components/admin/layout/index'
import axios from 'axios'

import './styles.scss'

class NewLayout extends Component {

    state = {
        toggled: false
    }

    toggleSidebar() {
        this.setState({
            toggled: !this.state.toggled
        })
    }

    render() {
        return <Layout />
    }
}

export default NewLayout
