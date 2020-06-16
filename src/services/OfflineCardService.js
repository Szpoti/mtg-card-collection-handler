export default class OfflineCardService {
  getAll() {
    const card = {
      name: "Yukora, the Prisoner",
      image_uris: {
        normal: "img/card.jpg",
      },
    };

    const cards = [];
    const displayableCardCount = 13;

    for (let i = 0; i < displayableCardCount; i++) {
      card.id = i;
      cards.push(JSON.parse(JSON.stringify(card)));
    }

    return new Promise(function (resolve) {
      return resolve(cards);
    });
  }

  search(title) {
    return this.getAll();
  }
}
