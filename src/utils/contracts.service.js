export class ContractsService {
  /**
   * @param {bytes} metadata
   * @param {string} owner
   * */
  static async registerRealEstate(metadata, owner) {
    if (!window.web3.utils.isAddress(owner)) {
      throw "Invalid address";
    }
    try {
      await window.realEstateContract.methods
        .registerNewRealEstate(metadata, owner)
        .send({ from: await this.getAccount() });
    } catch (err) {
      throw err.message;
    }
  }

  /**
   * @param {number} rentedRealEstate
   * @param {number} monthlyRentalPrice
   * @param {number} startsOn
   * @param {number} endsOn
   * @param {number} deposit
   */
  static async setNewRentAgreement(
    rentedRealEstate,
    monthlyRentalPrice,
    startsOn,
    endsOn,
    deposit
  ) {
    try {
      const data = await window.realEstateContract.methods
        .setNewRentAgreement(
          rentedRealEstate,
          monthlyRentalPrice,
          startsOn,
          endsOn,
          deposit
        )
        .encodeABI();
      await window.web3.eth.sendTransaction({
        to: window.realEstateContract.address,
        from: await this.getAccount(),
        data,
        value: deposit
      });
    } catch (err) {
      throw err.message;
    }
  }

  /**
   * @param {number} agreementId
   */
  static async acceptRentAgreement(agreementId) {
    try {
      await window.realEstateContract.methods
        .acceptRentAgreement(agreementId)
        .send({ from: await this.getAccount() });
    } catch (err) {
      throw err.message;
    }
  }
  /**
   *
   * @param {string} byWho
   */
  static async getOwnedRealEstates(byWho) {
    let result;
    try {
      result = await window.realEstateContract.methods
        .getOwnedRealEstates(byWho)
        .call();
    } catch (err) {
      throw err.message;
    }
    return result;
  }

  /**
   *
   * @param {number} realEstateId
   * @param {string} newOwner
   */
  static async changeRealEstateOwner(realEstateId, newOwner) {
    try {
      await window.realEstateContract.methods
        .changeRealEstateOwner(realEstateId, newOwner)
        .send({ from: await this.getAccount() });
    } catch (err) {
      throw err.message;
    }
  }

  /**
   *
   * @param {string} member
   */
  static async verifyMember(member) {
    if (!window.web3.utils.isAddress(member)) {
      throw "Invalid address";
    }
    try {
      await window.customerVerificationContract.methods
        .verifyMember(member)
        .send({ from: await this.getAccount() });
    } catch (err) {
      throw err.message;
    }
  }

  /**
   * @returns {Array}
   */
  static async getMyOffers() {
    let result;
    try {
      result = await window.realEstateContract.methods
        .getMyOffers()
        .call({ from: await this.getAccount() });
    } catch (err) {
      throw err.message;
    }
    return result;
  }

  /**
   *
   * @param {number} offerId
   * @returns {{accepted: boolean, renter: string, rentedRealEstate: number, monthlyRentalPrice: number, startsOn: number, endsOn: number, deposit: number}} Offer
   */
  static async getOfferDetails(offerId) {
    const offerDetails = await window.realEstateContract.methods
      .agreements(offerId)
      .call();
    console.log(offerDetails);
    return offerDetails;
  }

  /**
   *
   * @param {number} realEstateId
   */
  static async getRealEstatesOffers(realEstateId) {
    let result;
    try {
      result = await window.realEstateContract.methods
        .getRealEstatesOffers(realEstateId)
        .send({ from: await this.getAccount() });
    } catch (err) {
      throw err.message;
    }
    return result;
  }

  /**
   *
   * @param {string} member
   * @returns {boolean}
   */
  static async isMemberAdult(member) {
    let result;
    try {
      result = await window.customerVerificationContract.methods
        .isMemberAdult(member)
        .call({ from: await this.getAccount() });
    } catch (err) {
      throw err.message;
    }
    return result;
  }

  /**
   * @returns {string}
   */
  static async getAccount() {
    const account = (await window.web3.eth.getAccounts())[0];
    return account;
  }
}
