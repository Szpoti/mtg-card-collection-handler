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

  useFilter(cards, colors) {
    return this.getAll();
  }

  getOtherPrints(url) {
    return new Promise((resolve) => resolve([]));
  }

  getCatalog() {
    const sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const randomIntFromInterval = (min, max) => {
      // min and max included
      // https://stackoverflow.com/a/7228322/7306734
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const getRequest = () => {
      return sleep(randomIntFromInterval(1, 5) * 1000).then(() => {
        return ["one", "two"];
      });
    };

    return {
      forArtifacts: () => {
        return getRequest();
      },
      forEnchantments: () => {
        return getRequest();
      },
      forLands: () => {
        return getRequest();
      },
      forSpells: () => {
        return getRequest();
      },
      forPlaneswalkers: () => {
        return getRequest();
      },
      forCreatures: () => {
        return getRequest();
      },
      forArtistNames: () => {
        return getRequest();
      },
    };
  }
}
