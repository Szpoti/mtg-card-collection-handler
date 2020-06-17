import axios from "axios";

export default class LiveCardService {
  constructor() {
    this.mtg = require("mtgsdk");
  }

  search(title) {
    return axios
      .get(`https://api.scryfall.com/catalog/card-names`)
      .then((cards) => {
        return cards.data.data.filter((cardName) =>
          cardName.toLowerCase().includes(title.toLowerCase())
        );
      })
      .then(async (cards) => {
        const cardsToLoad = [];
        const promises = cards.map((cardName) => {
          return axios
            .get(
              encodeURI(
                `https://api.scryfall.com/cards/named?exact=${cardName}`
              )
            )
            .then((response) => {
              cardsToLoad.push(response.data);
            });
        });
        await Promise.all(promises);
        return cardsToLoad;
      });
  }

  async getAll(callback) {
    await axios.get("https://api.scryfall.com/cards?page=1").then((cards) => {
      callback(cards.data.data);
    });
  }
}
