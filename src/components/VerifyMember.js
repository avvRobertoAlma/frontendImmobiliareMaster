import React, { Component } from "react";

import { Container, FormControl, Button } from "react-bootstrap";

import { ContractsService } from "../utils/contracts.service";

import Swal from "sweetalert2";

export default class VerifyMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberAddress: ""
    };
  }

  async verifyMember(memberAddress) {
    Swal.fire({
      title: "Verifica in corso ...",
      showCancelButton: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      await ContractsService.verifyMember(memberAddress);
      Swal.fire({
        title: "Verified",
        text:
          "Tuttavia, la rete Ethereum potrebbe impiegare del tempo per aggiornare la transazione",
        type: "success"
      });
    } catch (err) {
      Swal.fire({
        title: "Spiacenti si è verificato un errore",
        text: err,
        type: "error"
      });
    }
  }

  render() {
    const { memberAddress } = this.state;
    return (
      <div classname="verify-member">
        <Container>
          <FormControl
            className="mt-2"
            placeholder="Account della persona da verificare"
            name="memberAddress"
            value={memberAddress}
            onChange={e => this.setState({ memberAddress: e.target.value })}
          />
          <Button
            name="confirm"
            className="mt-2"
            onClick={async () => this.verifyMember(this.state.memberAddress)}
          >
            Verifica
          </Button>
        </Container>
      </div>
    );
  }
}
