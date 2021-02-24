import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"

export class ProtectedRouteClient extends Component {
    render() {
        let token = localStorage.getItem("tokenClient"); //on decode ce qu'il y a dans la var token
        let decoded = jwt.decode(token)
        console.log(decoded);
        console.log(this.props.component);
        console.log(decoded);
        return (
            <>
              {decoded && decoded.client ? ( // si l9 correspond est égal à au token decode de l'admin dans son sign in dans le payload (admin=true) alors
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
    token: state.clientReducer.token
  }); 
export default connect(mapStateToProps)(ProtectedRouteClient)
