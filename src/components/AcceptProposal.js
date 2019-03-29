import React, { Component } from "react";
import { Button, FormControl, Container } from "react-bootstrap";
import { ContractsService } from "../utils/contracts.service";
import Swal from "sweetalert2";

export default class AcceptProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreementId: ""
    };
  }

  async acceptProposal(proposalId) {
    Swal.fire({
      title: "Accepting ...",
      showCancelButton: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      await ContractsService.acceptRentAgreement(proposalId);
      Swal.fire({
        title: "Accepted",
        text:
          "However, Ethereum network may need some time to reflect the acceptation.",
        type: "success"
      });
    } catch (err) {
      Swal.fire({
        title: "Something went wrong",
        text: err,
        type: "error"
      });
    }
  }

  render() {
    const { agreementId } = this.state;
    return (
      <div classname="accept-proposala-agreement">
        <Container>
          <FormControl
            className="mt-2"
            placeholder="Identificativo Proposta di locazione"
            name="agreementId"
            value={agreementId}
            onChange={e => this.setState({ agreementId: e.target.value })}
          />
          <Button
            name="confirm"
            className="mt-2"
            onClick={async () => this.acceptProposal(this.state.agreementId)}
          >
            Confirm
          </Button>
        </Container>
      </div>
    );
  }
}
