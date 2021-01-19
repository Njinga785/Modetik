// import React, { Component } from 'react'
// import { Link } from "react-router-dom"
// import Nav from 'react-bootstrap/Nav'
// // import {NavLink} from "react-router-dom"
// import { connect } from "react-redux"
// // import Button from 'react-bootstrap/Button';
// import {signOutClients} from './store/actions/actionClient'

// export class HeaderClient extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             firstName: this.props.firstName,
//             profile: this.props.profile
//         }

//             this.SignOut = this.SignOut.bind(this)
//         }

//         SignOut() {
//             localStorage.clear()
//             this.props.signOutClients()
//     }
//     render() {
//         return (
//             <Nav>
//                 {/* <Nav.Item>
//                     <Nav.Link as={Link} to="/">ProductList</Nav.Link>
//                 </Nav.Item> */}
//                 <Nav.Item>
//                     <Nav.Link as={Link} to="/sign-up">SignUp</Nav.Link>
//                 </Nav.Item>
//                 <Nav.Item>
//                     <Nav.Link as={Link} to="/sign-in">Signin</Nav.Link>
//                 </Nav.Item>
//                 {/* <div id="client">
//                         <Link to={"/clientprofile"}><img id="pictureProfil" src={this.props.profile} alt="picture profil"/></Link>
//                         <Nav.Item >
//                             <NavLink as={Link} to="/userprofile">{this.props.name}</NavLink>
//                         </Nav.Item>
//                         <Button className="sm" variant="danger" onClick={this.SignOut}><Link className="link" to={"/"}>Sign-Out</Link></Button>
//                     </div> */}
                

//             </Nav>
//         )
//     }
// } 

// const mapStateToProps = (state) => ({ // Création des props reducer
//     firstName: state.clientReducer.firstName,
//     profile: state.clientReducer.profile
// });
  
// const mapDispatchToProps = {
//     signOutClients 
//  }
  

// export default connect(mapStateToProps, mapDispatchToProps)(HeaderClient)
