var displayCards = [];
var allCards = [];
let page = 1;

var Storage = {
  saveDisplayableCards: function (state) {
    displayCards = state;
  },
  getDisplayableCards: function () {
    return displayCards;
  },
  saveAllCards: function (state) {
    allCards = state;
  },
  getAllCards: function () {
    return allCards;
  },
  saveCurrentPage: function (state) {
    page = state;
  },
  getCurrentPage: function () {
    return page;
  },
};

module.exports = Storage;
