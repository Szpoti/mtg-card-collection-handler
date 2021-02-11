import axios from "axios";

export default class DeckService {
  constructor() {
    this.baseURL = "https://localhost:5001/api";
  }

  async createDeck(deckName, userId, formatId) {
    await axios
      .post(`${this.baseURL}/deck/create`, {
        name: deckName,
        userId: userId,
        formatId: formatId,
      })
      .then((response) => {
        return response;
      });
  }
}
