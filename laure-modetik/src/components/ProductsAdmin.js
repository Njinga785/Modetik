import React, { Component } from 'react'
import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
// import { connect } from "react-redux";
import axios from 'axios';
import Modal from 'react-modal'; 
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { getListProduits } from "./store/actions/actionProduits";
// import { deleteProduits } from "./store/actions/actionProduits";
// import { deleteAdminProducts } from "./store/actions/actionAdmin";
// import { Link } from 'react-router-dom';

class ProductsAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      produits: [],
      modalIsOpen: false,
      nom: '',
      prix: '',
      description: '',
      categorie_id: '',
      id: ''

    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  openModal(produit) {
    this.setState({
      modalIsOpen: true,
      nom: produit.nom,
      prix: produit.prix,
      description: produit.description,
      photo: produit.photo,
      categorie_id: produit.categorie_id,
      id: produit.id
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      nom: this.state.nom,
      prix: this.state.prix,
      description: this.state.description,
      photo: this.state.photo,
      categorie_id: this.state.categorie_id


    }) 

    let articles = { 
      nom: this.state.nom,
      prix: this.state.prix,
      description: this.state.description,
      photo: this.state.photo,
      categorie_id: this.state.categorie_id

    }

    // let id = this.props.match.params.id
    axios.put(`http://localhost:3003/produits/${this.state.id}`, articles, {headers: {'Content-Type': 'application/json'}})



    
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response;



      }).then((data) => {
        console.log(data)
        if (data === "success") {
          this.setState({
            message: "produit has been edited."
          });
        }
      }).catch((err) => {
        console.log(err)
      })
  }




  componentDidMount() {

    axios.get('http://localhost:3003/produits')
      .then((response) => {
       
        console.log(response.data)
        
        this.setState({ produits: response.data })
       

      })
      .catch(error => {
        console.error(error)
      })
  }

  deleteProduit(id) {
    // let id = this.props.match.params.id
    // console.log(this)
    axios.delete(`http://localhost:3003/produits/${id}`, {
      // firstName: this.state.firstName,
      // lastName: this.state.lastName,
      // email: this.state.email,
      // profile: this.state.profile,
      // id: produit.id




    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response;



      }).then((data) => {
        console.log(data)
        if (data === "success") {
          this.setState({
            message: "client has been delete"
          });
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  handleChange = (e) => {
    console.log(e.target.id, e.target.value)
    this.setState({
      [e.target.id]: e.target.value
    })
  }


  render() {

    const produits = this.state.produits;
    return (
      <div className="allProduits">
        <h4 className="title">LES PRODUITS</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
              <th>Description</th>
              <th>Photo</th>
              <th>Categorie_id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {produits && produits.map(produit => {

              return (
                <tr key={produit.id}>
                  <td>{produit.nom}</td>
                  <td>{produit.prix}</td>
                  <td>{produit.description}</td>
                  <td><img src={produit.photo} alt="produit" width="75" height="75" /></td>
                  <td>{produit.categorie_id}</td>
                  <td>
                    <span className="btn btn-primary" onClick={() => this.openModal(produit)} >Edit</span>

                    <span className="btn btn-danger" onClick={() => this.deleteProduit(produit.id)}>Delete</span>
                  </td>

                </tr>

              );

            })}
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              ariaHideApp={false}
              contentLabel="Example Modal" >
              <div className="form">
                <h1 className="titreForm">PRODUIT EDIT</h1>
                <Form onSubmit={this.handleSubmit}>

                  <Form.Group controlId="nom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control onChange={this.handleChange} value={this.state.nom} type="text" placeholder="Nom" required />
                  </Form.Group>

                  <Form.Group controlId="prix">
                    <Form.Label>Prix</Form.Label>
                    <Form.Control onChange={this.handleChange} value={this.state.prix} type="text" placeholder="Prix" required />
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={this.handleChange} value={this.state.description} as="textarea" placeholder="Description" required />
                  </Form.Group>

                  <Form.Group controlId="profile">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control onChange={this.handleChange} value={this.state.photo} type="text" placeholder="Photo" required />
                  </Form.Group>

                  <Form.Group controlId="categorie_id">
                    <Form.Label>Categorie_id</Form.Label>
                    <Form.Control onChange={this.handleChange} value={this.state.categorie_id} type="text" placeholder="Categorie" required />
                  </Form.Group>
                  <Button variant="success" type="submit">Submit</Button> <Button variant="outline-dark" type="close" onClick={() => this.closeModal()}>Close</Button>

                </Form>
              </div>
            </Modal>

          </tbody>
        </Table>

      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   admin_products: state.adminReducer.admin_products,
//   token: state.adminReducer.token
// });

// const mapDispatchToProps = {
//   getListProduits,
//   deleteProduits,
//   deleteAdminProducts
// };

export default ProductsAdmin
