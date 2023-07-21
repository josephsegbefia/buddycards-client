import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  Header
} from "../layout-components/components";

const API_URL = "http://localhost:5005";

function CreateCard(props) {
  const [word, setWord] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [meaning, setMeaning] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleWordChange = (e) => {
    setWord(e.target.value);
  };

  const handlePartOfSpeechChange = (e) => {
    setPartOfSpeech(e.target.value);
  };

  const handleMeaningChange = (e) => {
    setMeaning(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { user, word, partOfSpeech, meaning };

    axios
      .post(`${API_URL}/api/flashcards`, requestBody)
      .then((response) => {
        // console.log("Response", response.data);

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
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
            onChange={handleWordChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>POS:</Label>
          <Input
            type="text"
            placeholder="provide part of speech"
            name="pos"
            value={partOfSpeech}
            onChange={handlePartOfSpeechChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Meaning:</Label>
          <Input
            type="text"
            placeholder="meaning"
            name="word"
            value={meaning}
            onChange={handleMeaningChange}
          />
        </FormGroup>
        <SubmitButton type="submit">Sign Up</SubmitButton>
      </Form>
    </div>
  );
}

export default CreateCard;
