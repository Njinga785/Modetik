import React, { Component } from 'react'
import Table from "react-bootstrap/Table";
import axios from 'axios';
import Modal from 'react-modal';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


class ProduitsAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      produits: [],
      modalIsOpen: false,
      nom: '',
      prix: '',
      description: '',
      categorie_id: '',
      id: '',
      message: ''

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


    axios.put(`http://localhost:3003/produits/${this.state.id}`, articles, { headers: { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}` } })




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

    axios.delete(`http://localhost:3003/produits/${id}`, {

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
            message: "produit has been delete"
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
      <div className="allProduits col-11 col-md-8 mx-auto">
        <h1 className="title">LES PRODUITS</h1>
        <Table className="tableProduits" striped bordered hover>
          <thead>
            <tr >
              <th>Nom</th>
              <th>Prix</th>
              <th className="toto">Description</th>
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
                  <td className="descript">{produit.description}</td>
                  <td><img src={produit.photo} alt="produit" width="75" height="75" /></td>
                  <td>{produit.categorie_id}</td>
                  <td className="btn-toolbar">
                    <span className="btn btn-primary editer" onClick={() => this.openModal(produit)} >Editer</span>
                    
                    <span className="btn btn-danger supprimer" onClick={() => this.deleteProduit(produit.id)}>Supprimer</span>
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
                  <Button variant="success" type="submit">Envoyer</Button> <Button variant="outline-dark" type="close" onClick={() => this.closeModal()}>Close</Button>
                  <p className="editer">{this.state.message}</p>
                </Form>
              </div>
            </Modal>

          </tbody>
        </Table>

      </div>
    )
  }
}



export default ProduitsAdmin
