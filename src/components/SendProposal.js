import React, { Component } from "react";

import { Container, Button, FormControl } from "react-bootstrap";

import { DateRangePicker } from "react-dates";

import Swal from "sweetalert2";

import { ContractsService } from "../utils/contracts.service";

export default class SendProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rentedRealEstate: "",
      monthlyRentalPrice: "",
      startDate: null,
      endDate: null,
      deposit: ""
    };
  }

  async sendProposal(
    rentedRealEstate,
    monthlyRentalPrice,
    startsOn,
    endsOn,
    deposit
  ) {
    if (!startsOn || !endsOn) {
      Swal.fire({
        title: "Input non corretto",
        text: "Per favore selezione una data di inizio",
        type: "error"
      });
      return;
    }

    if (
      rentedRealEstate === "" ||
      monthlyRentalPrice === "" ||
      deposit === ""
    ) {
      Swal.fire({
        title: "Input non corretto",
        text: "Per favore inserisci i requisiti necessari della proposta",
        type: "error"
      });
      return;
    }

    const start = startsOn.valueOf() / 1000;
    const end = endsOn.valueOf() / 1000;
    Swal.fire({
      title: "Invio ...",
      showCancelButton: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      await ContractsService.setNewRentAgreement(
        rentedRealEstate,
        Math.floor(monthlyRentalPrice),
        start,
        end,
        Math.floor(deposit * Math.pow(10, 18)).toString()
      );
      Swal.fire({
        title: "Inviato",
        text:
          "Tuttavia, la rete Ethereum potrebbe impiegare del tempo per aggiornare la transazione.",
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
    const { rentedRealEstate, monthlyRentalPrice, deposit } = this.state;

    return (
      <div className="send-proposal">
        <Container>
          <FormControl
            className="mt-2"
            placeholder="Immobile da locare"
            name="rentedRealEstate"
            value={rentedRealEstate}
            onChange={e => this.setState({ rentedRealEstate: e.target.value })}
          />
          <FormControl
            className="mt-2"
            placeholder="Canone mensile offerto"
            name="monthlyRentalPrice"
            value={monthlyRentalPrice}
            onChange={e =>
              this.setState({ monthlyRentalPrice: e.target.value })
            }
          />
          <FormControl
            className="mt-2"
            placeholder="Deposito cauzionale offerto"
            name="deposit"
            value={deposit}
            onChange={e => this.setState({ deposit: e.target.value })}
          />
          <br />
          <DateRangePicker
            startDate={this.state.startDate}
            startDateId="startsOn"
            endDate={this.state.endDate}
            endDateId="endsOn"
            onDatesChange={async ({ startDate, endDate }) =>
              await this.setState({ startDate, endDate })
            }
            onClose={async ({ startDate, endDate }) => {
              await this.setState({ startDate, endDate });
            }}
            focusedInput={this.state.focusedInput}
            onFocusChange={async focusedInput => {
              this.setState({ focusedInput });
            }}
          />
          <br />
          <Button
            name="confirm"
            className="mt-2"
            onClick={async () =>
              this.sendProposal(
                this.state.rentedRealEstate,
                this.state.monthlyRentalPrice,
                this.state.startDate,
                this.state.endDate,
                this.state.deposit
              )
            }
          >
            Invia proposta
          </Button>
        </Container>
      </div>
    );
  }
}
