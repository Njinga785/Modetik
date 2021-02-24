import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"

class ProtectedRouteAdmin extends Component {

    render() {
        let token = localStorage.getItem("tokenAdmin"); //on decode ce qu'il y a dans la var token
        let decoded = jwt.decode(token)
        console.log(decoded);
        console.log(this.props.component);
        console.log(decoded);
        return (
            <>
              {decoded && decoded.admin ? ( // si l9 correspond est égal à au token decode de l'admin dans son sign in dans le payload (admin=true) alors
              // alors il aura acces à tous les composants qui contiennentn les private route et leur chemin
                <Route component={this.props.component} path={this.props.path} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              )}
            </>
          );
    }

  }

const mapStateToProps = (state) => ({ // Création des props reducer
  token: state.adminReducer.token
}); 
export default connect(mapStateToProps)(ProtectedRouteAdmin)