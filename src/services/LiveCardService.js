import axios from "axios";

export default class LiveCardService {
  constructor() {
    this.mtg = require("mtgsdk");
  }

  async search(title, callback) {
    let cardsToLoad = [];
    await axios
      .get(encodeURI(`https://api.scryfall.com/catalog/card-names`))
      .then((cards) => {
        return cards.data.data.filter((cardName) =>
          cardName.toLowerCase().includes(title.toLowerCase())
        );
      })
      .then((cards) => {
        cards.forEach(async (cardName) => {
          let response = await axios.get(
            `https://api.scryfall.com/cards/named?exact=${cardName}`
          );
          cardsToLoad.push(response.data);
        });
      })
      .then(() => {
        callback(cardsToLoad);
      });
  }

  async getAll(callback) {
    await axios.get("https://api.scryfall.com/cards?page=1").then((cards) => {
      callback(cards.data.data);
    });
  }
}
