import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
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

function CardDetails() {
  const { cardId } = useParams();
  const { user } = useContext(AuthContext);
  const [card, setCard] = useState();

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/api/users/${user._id}/flashcards/${cardId}`)
        .then((response) => {
          setCard(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [user, cardId]);

  if (!user) {
    // Render loading state or return null
    return (
      <div className="card-container">
        <FaSpinner />
      </div>
    );
  }

  return (
    <div className="card-container">
      <CardContainer>
        {card && (
          <div>
            <FlashCardTitle>Word: {card.word}</FlashCardTitle>
            <Title>Translation:</Title>
            <HighlightedText>{card.translation}</HighlightedText>
            <hr />

            {/* <SectionTitle>Parts of Speech (POS)</SectionTitle> */}
            {/* {card.pos.map((item, index) => (
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

            {/* {card.pos.map((item, index) => (
              <div key={index}>
                <h3>Text: {item.text}</h3>
                <ul>
                  {item.terms.map((term, termIndex) => (
                    <li key={termIndex}>
                      <strong>{term.text}</strong> - {term.tags.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            ))} */}

            <SectionTitle>Conjugations</SectionTitle>
            {card.conjugations ? (
              card.conjugations.map((conjugation, index) => (
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
              ))
            ) : (
              <ItemValue>Nothing to conjugate..no verbs present</ItemValue>
            )}

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
      <br />
      <Link to="/users/flashcards">
        <FlashCardButton style={{ backgroundColor: "red" }}>
          Back to Cards
        </FlashCardButton>
      </Link>
    </div>
  );
}

export default CardDetails;
