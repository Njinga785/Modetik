import React, {Component} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

import Button from 'react-bootstrap/Button';




export class YourProfile extends Component {

  
    render() {
    return (
        <Card className="p-3" style={{ width: '18rem' }}>
        <h3>Votre Profile</h3>
        <Card.Header className="logos"> <img style={{width:80, height:80, borderRadius: '50%'}}  alt=""/></Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>FisrtName</ListGroup.Item>
          <ListGroup.Item>Email</ListGroup.Item>
          { <ListGroup.Item>Password</ListGroup.Item> }
          <Button style={{width: '200px'}} className="btn-block mx-auto bouton-login">Modifier</Button>
        </ListGroup>
      </Card>

    )
    }
}

export default YourProfile;