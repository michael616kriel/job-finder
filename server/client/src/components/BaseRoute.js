import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AppState, {AppContext} from "./AppContext";

class BaseRoute extends Component {

    state = {
      isLoading : true
    }
  
    constructor(props){
      super(props)
      
    }
  
    componentDidMount() {
      this.context.setHistory(this.props.history)
      this.context.checkToken().then((data) => {
        if(data.user && data.authenticated){
          this.context.setUser(data.user)
          this.context.setAuthenticated(data.authenticated)
          this.setState({
            isLoading : false
          })
        }else{
          this.setState({
            isLoading : false
          })
        }
      })
    }

    checkPermission(roles){
      for(var k in roles){
        if(this.props.roles.includes(roles[k])){
          return true
        }
      }
      return false
    }

    render(){
      const { isLoading } = this.state;
      const Component = this.props.component
      if(isLoading) {
        return <div>Loading...</div>
      }
      if(!this.props.protected){
        return (<Component {...this.props} />)
      }else{
        if(!this.context.authenticated) {
            return <Redirect to="/login" />
        }
        if(!this.checkPermission(this.context.user.roles)){
          return <div>Access Denied</div>
        }
        return (<Component {...this.props} />)
      }
    }
  }
  
  BaseRoute.contextType = AppContext
  export default BaseRoute;