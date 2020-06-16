import axios from "axios";

export default class LiveCardService {
  constructor() {
    this.mtg = require("mtgsdk");
  }

  search(title, callback) {
    this.cardsToAdd = [];
    axios
      .get(encodeURI(`https://api.scryfall.com/catalog/card-names`))
      .then((cards) => {
        callback(
          cards.data.data.filter((cardName) =>
            cardName.toLowerCase().includes(title.toLowerCase())
          )
        );
        return cards;
      });
  }

  async searchExact(cardName) {
    console.log("Api fetch, getting: " + cardName);
    await axios
      .get(`https://api.scryfall.com/cards/named?exact=${cardName}`)
      .then((cardData) => {
        console.log("Card data: ", cardData.data);
        let data = cardData.data;
        return data;
      });
  }

  async getAll(callback) {
    console.log("Geting all cards with Axios...");
    await axios.get("https://api.scryfall.com/cards?page=1").then((cards) => {
      console.log("Cards arrived. The array is: ", cards.data.data);
      console.log("\n\n");
      callback(cards.data.data);
    });
  }
}
