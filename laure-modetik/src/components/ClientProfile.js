
import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {SignInClients} from './store/actions/actionClient'
import axios from 'axios';

const ClientProfile = () => { 
  const dispatch = useDispatch()
  const client = useSelector(state => state.clientReducer)
  const [inputs, setInputs] = useState({}); 


  const handleChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    console.log(inputs)
  }
    //  EditProfile = (e) => {
    //     e.preventDefault()
    //     let id = this.props.match.params.id
    //     axios.put(`http://localhost:3003/clients/${id}`, { 
          
    //         firstName: this.state.firstName,
    //         // lastName: this.state.lastName,
    //         email: this.state.email,
    //         password: e.target.password.value,
    //         profile: this.state.profile

    //     })
    //         .then((response) => {
    //             console.log(response)
    //             this.props.SignInClients(this.props.token, this.state.firstName, this.state.email, this.props.id, this.state.profile)

    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

        return(
            <div>
                <h4 className="title">EDIT YOUR PROFILE</h4>
            <Form onSubmit={this.EditProfile}>
            <Form.Row>
              <Form.Group  controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" onChange={handleChange} value={inputs.firstName} type="text" placeholder="First Name" />
              </Form.Group>
          
              
            </Form.Row> 
            <Form.Row>
              <Form.Group controlId="email">
                <Form.Label>Email adress</Form.Label>
                <Form.Control name="email" onChange={handleChange} value={this.state.email} type="email" placeholder="Enter email" />
              </Form.Group>
          
              {/* <Form.Group controlId="profile">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control name="profile" onChange={this.handleChange} value={this.state.profile} type="text" placeholder="Picture" />
              </Form.Group> */}
            </Form.Row> 
            <Form.Row>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="enter new password" />
              </Form.Group>
          
              
            </Form.Row>
          
             <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
          </div>

        )
    

} 


export default ClientProfile

