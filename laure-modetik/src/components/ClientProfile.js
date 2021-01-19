
import React, {Component} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {SignInClients} from './store/actions/actionClient'



class ClientProfile extends Component { 
    constructor(props){
        super(props)
        this.state={
            id: this.props.id,
            firstName:this.props.firstName,
            // lastName:this.props.lasttName,
            email: this.props.email,
            profile:this.props.profile
           
        }
        this.EditProfile = this.EditProfile.bind(this)
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
        // this.handleChangeLastName = this.handleChangeLastName.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeProfile = this.handleChangeProfile.bind(this)
        
    } 

     EditProfile = (e) => {
        e.preventDefault()
        console.log({
            firstName: this.state.firstName,
            // lastName: this.state.lastName,
            email: this.state.email,
            // password: this.state.password,
            profile: this.state.profile

        })
        axios.put(`http://localhost:3003/clients/${id}`, {
            firstName: this.state.firstName,
            // lastName: this.state.lastName,
            email: this.state.email,
            password: e.target.password.value,
            profile: this.state.profile

        })
            .then((response) => {
                console.log(response)
                this.props.SignInClients(this.props.token, this.state.firstName, this.state.email, this.props.id, this.state.profile)

            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleChangeFirstName(e) {
        this.setState({firstName: e.target.value})
    }

    // handleChangeLastName(e) {
    //     this.setState({lastName: e.target.value})
    // }

    handleChangeEmail(e) {
        this.setState ({email: e.target.value})
    }
    
    handleChangeProfile(e) {
        this.setState ({profile : e.target.value})
    }
    render() {
        return(
            <div>
                <h4 className="title">EDIT YOUR PROFILE</h4>
            <Form onSubmit={this.EditProfile}>
            <Form.Row>
              <Form.Group  controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" onChange={this.handleChangeFirstN} value={this.state.firstName} type="text" placeholder="First Name" />
              </Form.Group>
          
              
            </Form.Row> 
            <Form.Row>
              <Form.Group controlId="email">
                <Form.Label>Email adress</Form.Label>
                <Form.Control name="email" onChange={this.handleChangeEmail} value={this.state.email} type="email" placeholder="Enter email" />
              </Form.Group>
          
              <Form.Group controlId="profile">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control name="profile" onChange={this.handleChangeProfile} value={this.state.profile} type="text" placeholder="Picture" />
              </Form.Group>
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

} 

const mapStateToProps = (state) => ({ // Création des props reducer
    token: state.clientReducer.token,
    firstName: state.clientReducer.firstName,
    email: state.clientReducer.email,
    id: state.clientReducer.id,
    profilr: state.clientReducer.profile

});
const mapDispatchToProps = {
    SignInClients 
 }

export default connect(mapStateToProps, mapDispatchToProps ) (ClientProfile)

