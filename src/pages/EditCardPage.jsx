import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import {
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  Header
} from "../layout-components/components";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditCardPage(props) {
  const [word, setWord] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [meaning, setMeaning] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userId, cardId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/users/${userId}/flashcards/${cardId}`)
      .then((response) => {
        const oneCard = response.data;
        console.log(oneCard);
        setWord(oneCard.word);
        setMeaning(oneCard.meaning);
        setPartOfSpeech(oneCard.partOfSpeech);
      })
      .catch((error) => console.log(error));
  }, [cardId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { word, meaning, partOfSpeech };
    axios
      .post(
        `${API_URL}/api/users/${userId}/flashcards/${cardId}/edit`,
        requestBody
      )
      .then((response) => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="form-container">
      {/* <Header>Create your card here</Header> */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Word:</Label>
          <Input
            type="text"
            placeholder="word"
            name="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>POS:</Label>
          <Input
            type="text"
            placeholder="provide part of speech"
            name="pos"
            value={partOfSpeech}
            onChange={(e) => setPartOfSpeech(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Meaning:</Label>
          <Input
            type="text"
            placeholder="meaning"
            name="word"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
          />
        </FormGroup>
        <SubmitButton type="submit">Update</SubmitButton>
      </Form>
    </div>
  );
}

export default EditCardPage;
