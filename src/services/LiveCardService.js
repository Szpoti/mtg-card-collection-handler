import axios from "axios";

export default class LiveCardService {
  useFilter(cards, colors) {
    if (colors.length <= 0) {
      return cards;
    }
    let cardsToReturn = [];
    cards.map((card) => {
      for (let c1 = 0; c1 < card.color_identity.length; c1++) {
        for (let c2 = 0; c2 < colors.length; c2++) {
          if (card.color_identity[c1] === colors[c2]) {
            cardsToReturn.push(card);
            return;
          }
        }
      }
    });
    return cardsToReturn;
  }

  async getOtherPrints(oracleId) {
    const prints = [];
    console.log("url", oracleId);
    await axios
      .get(`https://localhost:5001/api/Card/${oracleId}/prints`)
      .then((cards) => {
        cards.data.map((card) => prints.push(card));
      });
    return prints;
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
              `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(
                cardName
              )}`
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
    await axios.get("https://localhost:5001/api/Cards").then((cards) => {
      callback(cards.data);
    });
  }
}
