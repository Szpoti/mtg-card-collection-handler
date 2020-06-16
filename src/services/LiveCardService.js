export default class LiveCardService {
  constructor() {
    this.mtg = require("mtgsdk");
  }

  getAll() {
    return this.mtg.card
      .where({
        supertypes: "legendary",
        subtypes: "demon",
        types: "creature",
        colors: "black",
        page: 0,
      })
      .then((cards) => {
        console.log(cards);
        return cards.filter((card) => card.multiverseid !== undefined);
      });
  }
}
