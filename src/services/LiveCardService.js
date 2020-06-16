import axios from "axios";

export default class LiveCardService {
  constructor() {
    this.mtg = require("mtgsdk");
  }

  async search(title, callback) {
    console.log("Searching title: " + title);
    await axios
      .get(encodeURI(`https://api.scryfall.com/cards/search?q=${title}`))
      .then((cards) => {
        console.log(cards.data.data);
        callback(cards.data.data);
      });
  }

  async getAll(callback) {
    console.log("In getAll");
    await axios.get("https://api.scryfall.com/cards?page=1").then((cards) => {
      console.log(cards.data.data);
      callback(cards.data.data);
    });
  }
}
