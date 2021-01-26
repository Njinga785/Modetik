import React, { Component } from 'react';
import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

export class Contact extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nom: '',
           email: '',
            message: ''
        } 
        // this.resetForm = this.resetForm.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault({
            nom: this.state.nom,
            email: this.state.em,
            message: this.state.message
        })

        axios.post(`http://localhost:3003/contact`, {
            nom: this.state.nom,
            email: this.state.email,
            message: this.state.message
        },
            {
               
            })
            .then((response) => {
                console.log(response)
                // this.props.addProduct()
            })
            .catch((err) => {
                console.log(err)
            })
    } 

    onNomChange(e) {
        this.setState({nom: e.target.value})
    }
  
    onEmailChange(e) {
        this.setState({email: e.target.value})
    }
  
    onMessageChange(e) {
        this.setState({message: e.target.value})
    }

    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.id]: e.target.value
    //     })

    // }

    resetForm = (e) =>{
        this.setState({nom: '', email: '', message: ''})
      }

    render() {
        return (
            <div>
                <div className="form">
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input type="text" className="form-control" id="nom" value={this.state.nom} onChange={this.onNomChange.bind(this)} />
          </div>
          <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
          </div>
          <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" rows="5" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

                </div>
            </div>
        )
    }
}

export default Contact
