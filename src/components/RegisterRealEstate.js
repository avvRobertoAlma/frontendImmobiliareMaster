import React, { Component } from "react";

import { FormControl, Button, Container } from "react-bootstrap";

import Swal from "sweetalert2";

import { ContractsService } from "../utils/contracts.service";
export default class RegisterRealEstate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      realEstateAddress: ""
    };
  }

  async registerRealEstate(owner, realEstateAddress) {
    const metadata = window.web3.utils.keccak256(realEstateAddress);
    Swal.fire({
      title: "Registrazione ...",
      showCancelButton: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      await ContractsService.registerRealEstate(metadata, owner);
      Swal.fire({
        title: "Registrato",
        text:
          "Tuttavia, la rete Ethereum potrebbe impiegare del tempo per aggiornare la transazione",
        type: "success"
      });
    } catch (err) {
      Swal.fire({
        title: "Spiacenti, si è verificato un errore",
        text: err,
        type: "error"
      });
    }
  }

  render() {
    const { owner, realEstateAddress } = this.state;
    return (
      <div className="register-real-estate">
        <Container>
          <FormControl
            className="mt-2"
            placeholder="Account del proprietario"
            name="owner"
            value={owner}
            onChange={e => this.setState({ owner: e.target.value })}
          />
          <FormControl
            className="mt-2"
            placeholder="Descrizione dell'immobile"
            name="realEstateAddress"
            value={realEstateAddress}
            onChange={e => this.setState({ realEstateAddress: e.target.value })}
          />
          <Button
            name="confirm"
            className="mt-2"
            onClick={async () =>
              this.registerRealEstate(
                this.state.owner,
                this.state.realEstateAddress
              )
            }
          >
            Registra immobile
          </Button>
        </Container>
      </div>
    );
  }
}
