import React, { Component } from 'react'
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import axios from 'axios'
import { panierClient } from "./store/actions/actionClient";

export class MesPaniers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      panier_client: [],

      
    }
  }
  componentDidMount() {
    
    axios.get(`http://localhost:3003/panier/${this.props.id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('tokenClient')}` }
    })
      .then((response) => {

        console.log(response.data)
        this.setState({ panier_client: response.data })

        this.props.panierClient(response.data)

      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    let panier_client = this.props.panier_client
    return (
      <div className="panier">
        <h4 className="title">MES PANIERS</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Total</th>
              <th>Date</th>
             
              
            </tr>
          </thead>
          <tbody>
            {panier_client && panier_client.map((panier, index) => {
              // console.log(panierClients)
              return (
                <tr key={index}>
                  <td>{panier.total}</td>
                  <td>{panier.date}</td>
                  
                  
                </tr>
              );

            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  panier_client: state.clientReducer.panier_client,
  id: state.clientReducer.id
});

const mapDispatchToProps = {
  panierClient
};

export default connect(mapStateToProps, mapDispatchToProps)(MesPaniers)
