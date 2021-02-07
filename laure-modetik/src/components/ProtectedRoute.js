import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"

class ProtectedRoute extends Component {

    render() {
        const Component = this.props.component;
        const token = this.props.token;
       
        if (token) {
            return <Component/>
        } else {
            return <Redirect to={{pathname: '/'}}/>
        }

        // return token ? (<Component/>) : (<Redirect to={{pathname:'/'}}/>);
    }
}

const mapStateToProps = (state) => ({ // Création des props reducer
  token: state.adminReducer.token
}); 
export default connect(mapStateToProps)(ProtectedRoute)