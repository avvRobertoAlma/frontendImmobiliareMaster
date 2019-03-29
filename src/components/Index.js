import React, { Component } from "react";

import { Carousel, Container, Jumbotron, Button } from "react-bootstrap"

export default class Index extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
          <Container>
              <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="Skyline02.jpeg"
      alt="First slide"
      height="500"
    />
    <Carousel.Caption>
      <h3>Affitto Immobiliare Master</h3>
      <p>Proprietà Immobiliari in locazione con ETH.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="Skyline01.jpeg"
      alt="Second slide"
      height="500"
    />

    <Carousel.Caption>
      <h3>Smart Contract</h3>
      <p>Invia la proposta di locazione con uno smart contract.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="Apartments01.jpeg"
      alt="Third slide"
      height="500"
    />

    <Carousel.Caption>
      <h3>Blockchain</h3>
      <p>Tutte le transazioni sono memorizzate nella blockchain</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
<Jumbotron>
  <h1>Inizia ora</h1>
  <p>
    Registra le tue proprietà immobiliari e accedi a tutte le funzioni dello smart contract
  </p>
  <p>
    <Button variant="primary" href="/registerRealEstate">Registra immobile</Button>
  </p>
</Jumbotron>;
          </Container>
        
      );
    }
  }