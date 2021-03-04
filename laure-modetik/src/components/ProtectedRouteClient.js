import React, { Component } from 'react'
import {Redirect } from 'react-router-dom'
import { connect } from "react-redux"


export class ProtectedRouteClient extends Component {
    render() {
      const Component = this.props.component;
      const token = localStorage.getItem("tokenClient")
  
      if (token) {
        return <Component />
      } else {
        return <Redirect to={{ pathname: '/' }} />
      }
    }

  } 
  const mapStateToProps = (state) => ({ // Création des props reducer
    token: state.clientReducer.token
  }); 
export default connect(mapStateToProps)(ProtectedRouteClient)
