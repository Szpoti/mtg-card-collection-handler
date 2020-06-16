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
      .then(async (cards) => {
        console.log("Cards found! Filtering...");
        console.log("Begginging foreach...");
        cards.forEach((cardName) => {
          console.log("Api fetch, getting: " + cardName);
          axios
            .get(`https://api.scryfall.com/cards/named?exact=${cardName}`)
            .then((cardData) => {
              console.log(
                "Api fetch finished for " +
                  cardData.data.name +
                  ", pushing into cardsToLoad..."
              );
              cardsToLoad.push(cardData.data);
              console.log("cardsToLoad: ", cardsToLoad);
            })
            .then(() => {
              console.log("Calling callback from LiveCardService.");
              callback(cardsToLoad);
            });
          console.log("After api fetch, getting: " + cardName);
        });
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
