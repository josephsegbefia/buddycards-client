import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import {
  FlashCardTitle,
  CardContainer,
  Title,
  SectionTitle,
  ItemContainer,
  ItemLabel,
  ItemValue,
  HighlightedText
} from "../layout-components/components";

const API_URL = "http://localhost:5005";

function CardDetails() {
  const [card, setCard] = useState();
  const { cardId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/api/users/${user._id}/flashcards/${cardId}`)
        .then((response) => {
          //   console.log(response.data.conjugations);
          setCard(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  if (card) {
    console.log(card.pos);
  }

  return (
    <div className="card-container">
      <CardContainer>
        {card && (
          <div>
            <FlashCardTitle>Word: {card.word}</FlashCardTitle>
            <Title>Translation:</Title>
            <HighlightedText>{card.translation}</HighlightedText>

            {/* <SectionTitle>Parts of Speech (POS)</SectionTitle>
          {card.pos.map((item, index) => (
            <ItemContainer key={index}>
              <ItemLabel>Text:</ItemLabel>
              <ItemValue>
                <HighlightedText>{item.text}</HighlightedText>
              </ItemValue>
              {item.terms.map((term, termIndex) => (
                <div key={termIndex}>
                  <ItemLabel>Term {termIndex + 1}:</ItemLabel>
                  <ItemValue>
                    {term.pre}
                    <HighlightedText>{term.text}</HighlightedText>
                    {term.post}
                  </ItemValue>
                </div>
              ))}
            </ItemContainer>
          ))} */}

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
            <SectionTitle>Root Words</SectionTitle>
            <ItemContainer>
              <ItemLabel>Word:</ItemLabel>{" "}
              <ItemValue>
                <HighlightedText>{card.word}</HighlightedText>
              </ItemValue>
            </ItemContainer>
          </div>
        )}
      </CardContainer>
    </div>
  );
}

export default CardDetails;
