import React, { Component } from "react";

import { Button, Table } from "react-bootstrap";
import { ContractsService } from "../utils/contracts.service";

export default class ProposalBoxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: [],
      dataFetched: false
    };
    this.getOffers();
  }

  async getOffers() {
    const ids = await ContractsService.getMyOffers();
    let result = [];
    for (let i = 0; i < ids.length; i++) {
      const details = await ContractsService.getOfferDetails(i);
      result.push(details);
    }
    await this.setState({ proposals: result });
    await this.setState({ dataFetched: true });
  }

  render() {
    return (
      <div className="proposalsBox">
        {this.state.dataFetched ? (
          <Table>
            <thead>
              <tr>
                <th>Id offerta</th>
                <th>Immobile locato</th>
                <th>Canone Mensile</th>
                <th>Conduttore</th>
                <th>Deposito cauzionale</th>
                <th>Accettato</th>
              </tr>
            </thead>
            <tbody>
              {this.state.proposals.map((proposal, index) => {
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{proposal.rentedRealEstate}</td>
                    <td>{proposal.monthlyRentalPrice}</td>
                    <td>{proposal.renter}</td>
                    <td>{proposal.deposit}</td>
                    <td>{proposal.accepted}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          "Caricamento ... "
        )}
      </div>
    );
  }
}
