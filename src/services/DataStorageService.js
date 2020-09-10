var displayCards = [];
var allCards = [];
var artifactTypes = [];
var enchantmentTypes = [];
var landTypes = [];
var planeswalkerTypes = [];
var creatureTypes = [];
var artists = [];
let page = 1;

var Storage = {
  //Cards to display
  saveDisplayableCards: function (state) {
    displayCards = state;
  },
  getDisplayableCards: function () {
    return displayCards;
  },
  //All cards
  saveAllCards: function (state) {
    allCards = state;
  },
  getAllCards: function () {
    return allCards;
  },
  //Current page
  saveCurrentPage: function (state) {
    page = state;
  },
  getCurrentPage: function () {
    return page;
  },
  //Artifacts
  saveArtifactTypes: function (state) {
    artifactTypes = state;
  },
  getArtifactTypes: function () {
    return artifactTypes;
  },
  //Enchantmens
  saveEnchantmentTypes: function (state) {
    enchantmentTypes = state;
  },
  getEnchantmentTypes: function () {
    return enchantmentTypes;
  },
  //Lands
  saveLandTypes: function (state) {
    landTypes = state;
  },
  getLandTypes: function () {
    return landTypes;
  },
  //Planeswalkers
  savePlaneswalkerTypes: function (state) {
    planeswalkerTypes = state;
  },
  getPlaneswalkerTypes: function () {
    return planeswalkerTypes;
  },
  //Creatures
  saveCreatureTypes: function (state) {
    creatureTypes = state;
  },
  getCreatureTypes: function () {
    return creatureTypes;
  },
  //Artists
  saveArtists: function (state) {
    artists = state;
  },
  getArtists: function () {
    return artists;
  },
};

module.exports = Storage;
