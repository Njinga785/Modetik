// import React, { Component } from 'react'

// export class Header extends Component {
//     render() {

//         if (this.props.location.pathname.includes("admin")) {
//             if (localStorage.getItem("token")) {

//                 return (
//                     <Nav variant="pills" defaultActiveKey="/dashboard">
//                         <Nav.Item>
//                             <Nav.Link as={Link} to="/addproduct">AddProduct</Nav.Link>
//                             <Nav.Link as={Link} to="/admin/listproduct">Vos produits</Nav.Link>
//                         </Nav.Item>

//                     </Nav>
//                 );

//             } else {

//                 return (
//                     <Nav variant="pills" defaultActiveKey="/admin">
//                         <Nav.Item>
//                             <Nav.Link as={Link} to="/sign-in">Signin</Nav.Link>
//                         </Nav.Item>
//                         <Nav.Item>
//                             <Nav.Link as={Link} to="/sign-up">SignUp</Nav.Link>
//                         </Nav.Item>

//                     </Nav>
//                 );

//             }


//         } else {

//             return (
//                 <Nav variant="pills" defaultActiveKey="/home">
//                     <Nav.Item>
//                         <Nav.Link as={Link} to="/home">Mon site</Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link as={Link} to="/catalogue">Nos produits</Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link as={Link} to="/sign-up">SignUp</Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link as={Link} to="/sign-in">Signin</Nav.Link>
//                     </Nav.Item>

//                 </Nav>
//             );

//         }

//         export default Header
