export default class LiveCardService {
  constructor() {
    this.mtg = require("mtgsdk");
  }

  search(title) {
    return this.mtg.card
      .where({
        name: `${title}`,
      })
      .then((cards) => {
        return cards.filter((card) => card.multiverseid !== undefined);
      });
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
