import axios from "axios";

export default class LiveCardService {
  useFilter(cards, colors) {
    if (colors.length <= 0) {
      return cards;
    }
    let cardsToReturn = [];
    cards.map((card) => {
      for (let c1 = 0; c1 < card.colorIdentity.length; c1++) {
        for (let c2 = 0; c2 < colors.length; c2++) {
          if (card.colorIdentity[c1] === colors[c2]) {
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

  search(title, colors) {
    return axios
      .get(
        `https://localhost:5001/api/Search/card?q=${title}&colors=${colors.join(
          ","
        )}`
      )
      .then((response) => {
        return response.data;
      });
  }

  static async getSymbols() {
    console.log("Getting symbols....");
    return await axios
      .get("https://localhost:5001/api/symbology/symbols")
      .then((symbols) => {
        console.log("symbols", symbols.data);
        return symbols.data;
      });
  }

  async getAll(callback) {
    await axios.get("https://localhost:5001/api/Cards").then((cards) => {
      callback(cards.data);
    });
  }
}
