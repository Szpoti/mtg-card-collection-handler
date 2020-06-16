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
        console.log("Cards found! Filtering...");
        cards.forEach(async (cardName) => {
          let response = await axios.get(
            `https://api.scryfall.com/cards/named?exact=${cardName}`
          );
          cardsToLoad.push(response.data);
        });
      })
      .then(() => {
        console.log(
          "Loading finished! Calling 'loadCards' from LiveCardService..."
        );
        callback(cardsToLoad);
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
