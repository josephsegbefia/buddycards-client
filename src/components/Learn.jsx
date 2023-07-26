import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  FlashCardTitle,
  CardContainer,
  Title,
  SectionTitle,
  ItemContainer,
  ItemLabel,
  ItemValue,
  HighlightedText,
  FlashCardButton
} from "../layout-components/components";

const API_URL = "http://localhost:5005";

function Learn() {
  const [index, setIndex] = useState(0);
  //const [cards, setCards] = useState([]);
  const [card, setCard] = useState();
  const [buttonInActive, setButtonInActive] = useState(false);

  const [cards, setCards] = useState(() => {
    const storedCards = localStorage.getItem("flashcards");
    return storedCards ? JSON.parse(storedCards) : [];
  });

  const { user } = useContext(AuthContext);

  function handleNextCard() {
    if (index < cards.length - 1) {
      setIndex(index + 1);
    } else if (index === cards.length - 1) {
      setButtonInActive(true);
    }
  }

  function handlePrevCard() {
    if (index > 0) {
      setIndex(index - 1);
      setButtonInActive(false); // Enable the "Next" button if going back to a previous card
    }
  }
  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/api/users/${user._id}/flashcards`)
        .then((response) => {
          setCards(response.data);
          localStorage.setItem("flashcards", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      setCard(cards[index]);
    }
  }, [cards, index]);

  console.log(card);
  return (
    <div className="card-container">
      <CardContainer>
        {card && (
          <div>
            <FlashCardTitle>Word: {card.word}</FlashCardTitle>
            <Title>Translation:</Title>
            <HighlightedText>{card.translation}</HighlightedText>
            <hr />
            <SectionTitle>Conjugations</SectionTitle>
            {card.conjugations.map((conjugation, index) => (
              <ItemContainer key={index}>
                <ItemLabel>{conjugation.infinitive}:</ItemLabel>
                {Object.entries(conjugation).map(([tense, tenseData]) => (
                  <div key={tense}>
                    <ItemLabel>{tense}:</ItemLabel>{" "}
                    {Object.entries(tenseData).map(([person, conjugated]) => (
                      <ItemValue key={person}>
                        <HighlightedText>{conjugated}</HighlightedText>
                      </ItemValue>
                    ))}
                  </div>
                ))}
              </ItemContainer>
            ))}
            {/* <SectionTitle>Root Words</SectionTitle>
            <ItemContainer>
              <ItemLabel>Word:</ItemLabel>{" "}
              <ItemValue>
                <HighlightedText>{card.word}</HighlightedText>
              </ItemValue>
            </ItemContainer> */}
          </div>
        )}
      </CardContainer>
      <div className="prevnext">
        <FlashCardButton
          //   disabled={buttonInActive}
          onClick={handlePrevCard}
          style={{ backgroundColor: "#FFBF00" }}
        >
          Previous
        </FlashCardButton>
        <FlashCardButton
          disabled={buttonInActive}
          onClick={handleNextCard}
          style={{ backgroundColor: "green" }}
        >
          Next
        </FlashCardButton>
      </div>
    </div>
  );
}

export default Learn;
