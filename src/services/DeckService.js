import axios from "axios";

export default class DeckService {
  constructor() {
    this.baseURL = "https://localhost:5001/api";
  }

  async createDeck(deckName, userId, formatId) {
    console.log("Creating new deck", deckName, userId, formatId);
    return await axios
      .post(`${this.baseURL}/deck/create`, {
        name: deckName,
        userId: parseInt(userId),
        formatId: formatId,
      })
      .then((response) => {
        return response;
      });
  }

  async getDecks(userId) {
    console.log("Geting decks");
    return await axios
      .post(`${this.baseURL}/deck/decksOf/${userId}`)
      .then((resp) => {
        console.log(resp);
        return resp.data;
      });
  }
}
