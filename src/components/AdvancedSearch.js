import React, { useState, useEffect } from "react";
import { Button, Container, Form, Col, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { ColorProvider } from "./ColorProvider";
import Filter from "./Filter";
import CustomMultiSelect from "./CustomMultiSelect";
import Loader from "./Loader";
import LoadedCardsDisplayer from "./LoadedCardsDisplayer";
import Pagination, { getPaginationCards } from "./Pagination";

const AdvancedSearch = (props) => {
  const cardService = props.cardService;

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const [colors, setColors] = useState([]);
  const [allArtifacts, setAllArtifacts] = useState([]);
  const [allEnchantments, setAllEnchantments] = useState([]);
  const [allLands, setAllLands] = useState([]);
  const [allPlaneswalkers, setAllPlaneswalkers] = useState([]);
  const [allCreatures, setAllCreatures] = useState([]);
  const [allArtists, setAllArtists] = useState([]);

  const [name, setName] = useState("");
  const [selectedArtifacts, setSelectedArtifacts] = useState([]);
  const [selectedEnchantments, setSelectedEnchantments] = useState([]);
  const [selectedLands, setSelectedLands] = useState([]);
  const [selectedPlaneswalkers, setSelectedPlaneswalkers] = useState([]);
  const [selectedCreatures, setSelectedCreatures] = useState([]);
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(Number.MAX_VALUE);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(props.match.params.page);
  const [cards, setCards] = useState([]);
  const [cardsToDisplay, setCardsToDisplay] = useState([]);

  useEffect(() => {
    if (cards.length === 0) {
      console.log("cards", cards);
      setIsLoading(true);
      const fetchData = async () => {
        const stringArrayToMultiSelect = (array) => {
          return array.map((item, index) => {
            return { label: item, value: index };
          });
        };

        const catalog = cardService.getCatalog();
        const promises = [
          catalog
            .forArtifacts()
            .then((artifacts) =>
              setAllArtifacts(stringArrayToMultiSelect(artifacts))
            ),
          catalog
            .forEnchantments()
            .then((enchantments) =>
              setAllEnchantments(stringArrayToMultiSelect(enchantments))
            ),
          catalog
            .forLands()
            .then((lands) => setAllLands(stringArrayToMultiSelect(lands))),
          catalog
            .forPlaneswalkers()
            .then((planeswalkers) =>
              setAllPlaneswalkers(stringArrayToMultiSelect(planeswalkers))
            ),
          catalog
            .forCreatures()
            .then((creatures) =>
              setAllCreatures(stringArrayToMultiSelect(creatures))
            ),
          catalog
            .forArtistNames()
            .then((artists) =>
              setAllArtists(stringArrayToMultiSelect(artists))
            ),
        ];
        await Promise.all(promises);

        setIsLoading(false);
        console.log("currentPage !== undefined", currentPage !== undefined);
        console.log("cards.length === 0", cards.length === 0);
        if (cards.length === 0 && currentPage !== undefined) {
          console.log("redirecting");
          setCurrentPage(undefined);
          history.push("/search");
        }
      };
      fetchData();
    } else {
      setCardsToDisplay(getPaginationCards(currentPage, cards));
      console.log("cardsToDisplay", cardsToDisplay);
    }
  }, [currentPage]);

  const cleanFromMultiselect = (array) => {
    let r = [];
    array.forEach((element) => r.push(element.label));
    return r;
  };

  const search = async () => {
    setIsLoading(true);
    setCards([]);
    const type = {
      artifacts: cleanFromMultiselect(selectedArtifacts),
      enchantments: cleanFromMultiselect(selectedEnchantments),
      lands: cleanFromMultiselect(selectedLands),
      planeswalkers: cleanFromMultiselect(selectedPlaneswalkers),
      creatures: cleanFromMultiselect(selectedCreatures),
    };
    const price = {
      min: minimumPrice,
      max: maximumPrice,
    };
    const foundCards = await cardService.advancedSearch(
      name,
      colors,
      type,
      price,
      selectedArtists
    );
    setIsLoading(false);
    setCards(foundCards);
    setCardsToDisplay(getPaginationCards(1, foundCards));
    setCurrentPage(1);
  };

  return (
    <Container className="mt-4">
      <Form>
        <Form.Group>
          <Form.Row>
            <Col xs={12} md={3}>
              Card name
            </Col>
            <Col xs={12} md={9}>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                placeholder='Any words in the name, e.g. "Fire"'
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col xs={12} md={3}>
              Colors
            </Col>
            <Col xs={12} md={9}>
              <ColorProvider>
                <Filter setHomeColors={setColors} isDisabled={isLoading} />
              </ColorProvider>
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col xs={12} md={3}>
              Type line
            </Col>
            <Col xs={12} md={9}>
              <Row>
                <div className="col-12 col-md-6 col-lg-4 mb-2">
                  <CustomMultiSelect
                    options={allArtifacts}
                    selectedValues={selectedArtifacts}
                    setSelectedValues={setSelectedArtifacts}
                    name="Artifact type"
                    isDisabled={isLoading}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-2">
                  <CustomMultiSelect
                    options={allEnchantments}
                    selectedValues={selectedEnchantments}
                    setSelectedValues={setSelectedEnchantments}
                    name="Enchantment tpye"
                    isDisabled={isLoading}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-2">
                  <CustomMultiSelect
                    options={allLands}
                    selectedValues={selectedLands}
                    setSelectedValues={setSelectedLands}
                    name="Land type"
                    isDisabled={isLoading}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-2">
                  <CustomMultiSelect
                    options={allPlaneswalkers}
                    selectedValues={selectedPlaneswalkers}
                    setSelectedValues={setSelectedPlaneswalkers}
                    name="Planeswalker type"
                    isDisabled={isLoading}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-2">
                  <CustomMultiSelect
                    options={allCreatures}
                    selectedValues={selectedCreatures}
                    setSelectedValues={setSelectedCreatures}
                    name="Creature type"
                    isDisabled={isLoading}
                  />
                </div>
              </Row>
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col xs={12} md={3}>
              Prices
            </Col>
            <Col xs={12} md={9}>
              <Form.Row className="m-0">
                <Form.Control
                  type="text"
                  onChange={(e) => setMinimumPrice(e.target.value)}
                  disabled={isLoading}
                  className="col-3 mr-3"
                  placeholder="Minimum"
                />
                <Form.Control
                  type="text"
                  onChange={(e) => setMaximumPrice(e.target.value)}
                  disabled={isLoading}
                  className="col-3"
                  placeholder="Maximum"
                />
              </Form.Row>
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col xs={12} md={3}>
              Artist
            </Col>
            <Col xs={12} md={9}>
              <CustomMultiSelect
                options={allArtists}
                selectedValues={selectedArtists}
                setSelectedValues={setSelectedArtists}
                name="Any artist name, e.g. Megali"
                isDisabled={isLoading}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Row className="justify-content-center">
          <Button onClick={search} disabled={isLoading}>
            <Link to={`search/${1}`}>Search</Link>
          </Button>
        </Form.Row>
      </Form>
      <Container>
        <Pagination
          cards={cards}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setCardsToDisplay={setCardsToDisplay}
        />
        <Container className="mt-5">
          <Loader isLoading={isLoading} />
        </Container>
        <LoadedCardsDisplayer loadedCards={cardsToDisplay} />
        <Pagination
          cards={cards}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setCardsToDisplay={setCardsToDisplay}
        />
      </Container>
    </Container>
  );
};

export default AdvancedSearch;
