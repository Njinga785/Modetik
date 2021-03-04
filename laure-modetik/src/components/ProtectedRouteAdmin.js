import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"


class ProtectedRouteAdmin extends Component {

  render() {
    const Component = this.props.component;
    const token = localStorage.getItem("tokenAdmin")

    if (token) {
      return <Component />
    } else {
      return <Redirect to={{ pathname: '/' }} />
    }
  }

}

const mapStateToProps = (state) => ({ // Création des props reducer
  token: state.adminReducer.token
});
export default connect(mapStateToProps)(ProtectedRouteAdmin)