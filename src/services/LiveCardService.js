import axios from "axios";

export default class LiveCardService {
  useFilter(cards, colors) {
    if (colors.length <= 0) {
      return cards;
    }
    cards.map((card) => console.log(card));
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

  async getOtherPrints(url) {
    const prints = [];
    await axios.get(url).then((cards) => {
      cards.data.data.map((card) => prints.push(card));
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
    await axios.get("https://api.scryfall.com/cards?page=1").then((cards) => {
      callback(cards.data.data);
    });
  }
}
