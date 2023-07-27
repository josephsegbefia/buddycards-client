import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import "../flip-transition.css";
import "../card.css";
import {
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  Header,
  FlashCardTitle,
  CardContainer,
  EditButton,
  FlashCardButton
} from "../layout-components/components";

function PracticeCard({ onClick }) {
  const [flashCards, setFlashCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [isCorrect, setIsCorrect] = useState(null);

  const { user } = useContext(AuthContext);

  const API_URL = "http://localhost:5005";

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/api/users/${user._id}/flashcards`)
        .then((response) => {
          setFlashCards(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  useEffect(() => {
    setCurrentCardIndex(Math.floor(Math.random() * flashCards.length));
  }, [flashCards]);

  const handleNextCard = () => {
    // move to the next card
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashCards.length);
    setUserAnswer("");
  };
  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
    setDisabled(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentCard = flashCards[currentCardIndex];
    const correctTranslation = currentCard.translation.toLowerCase().trim();
    const userTranslation = userAnswer.toLocaleLowerCase().trim();

    let scoreIncrement = 0;

    if (correctTranslation === userTranslation) {
      scoreIncrement += 1;
    }

    //Set Score
    setScore((prevScore) => prevScore + scoreIncrement);
  };
  console.log("Score:", score);

  const currentCard = flashCards[currentCardIndex];
  if (flashCards.length === 0) {
    return <div className="card-container">Loading Card ..</div>;
  }

  return (
    <div className="card-container card">
      <h1>Practice Mode</h1>
      <br />
      <CardContainer className="card-front">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Word / Sentence:</Label>
            <h3>{currentCard.word}</h3>
            <Input
              type="text"
              value={userAnswer}
              placeholder="Please provide translation here"
              onChange={handleAnswerChange}
            />
          </FormGroup>
        </Form>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <EditButton onClick={onClick} disabled={disabled}>
            Submit
          </EditButton>
        </div>
      </CardContainer>

      <CardContainer className="card-back">
        <h3>Back</h3>
        {currentCard.translation}
        {score}
        <FlashCardButton
          onClick={() => {
            onClick(), handleNextCard(), setDisabled(true);
          }}
          style={{ backgroundColor: "green" }}
        >
          Next Card
        </FlashCardButton>
      </CardContainer>
    </div>
  );
}

export default PracticeCard;
