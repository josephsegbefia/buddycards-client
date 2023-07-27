import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [saveStatus, setSaveStatus] = useState("Ready");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleWordChange = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaveStatus("Saving");

    const wordBody = { word };
    axios
      .post(`${API_URL}/api/word-manipulation`, wordBody)
      .then((response) => {
        console.log(response.data);
        let conjugations = response.data.conjugations;
        let translation = response.data.translatedWord;
        let pos = response.data.pos[0].terms;

        let requestBody = {
          user,
          word,
          conjugations,
          translation,
          partOfSpeech: pos
        };

        axios
          .post(`${API_URL}/api/flashcards`, requestBody)
          .then((response) => {
            setSaveStatus("Success");
            console.log(response.data);
            toast.success("Card Created!", {
              position: toast.POSITION.TOP_RIGHT
            });
            navigate("/users/flashcards");
          })
          .catch((error) => {
            setSaveStatus("Error");
            console.log(error);
          });
      })
      .catch((error) => {
        setSaveStatus("Error");
        console.log(error);
      });

    // setWord("");
  };

  console.log(word);
  return (
    <div className="form-container">
      {/* <Header>Create your card here</Header> */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Word:</Label>
          <Input
            type="text"
            placeholder="word: A German word or sentence"
            name="word"
            value={word}
            onChange={handleWordChange}
          />
        </FormGroup>
        {/* <FormGroup>
          <Label>POS:</Label>
          <Input
            type="text"
            placeholder="provide part of speech"
            name="pos"
            value={partOfSpeech}
            onChange={handlePartOfSpeechChange}
          />
        </FormGroup> */}
        {/* <FormGroup>
          <Label>Meaning:</Label>
          <Input
            type="text"
            placeholder="meaning"
            name="word"
            value={meaning}
            onChange={handleMeaningChange}
          />
        </FormGroup> */}
        {
          {
            Saving: (
              <SubmitButton value="Creating..." type="submit" disabled>
                Creating Card...
              </SubmitButton>
            ),
            Success: (
              <SubmitButton value="Saved" type="submit" disabled>
                Card Created!
              </SubmitButton>
            ),
            Error: (
              <SubmitButton
                value="Save Failed - Retry?"
                type="submit"
              ></SubmitButton>
            ),
            Ready: (
              <SubmitButton value="Save" type="submit">
                Create Card
              </SubmitButton>
            )
          }[saveStatus]
        }
        <br />
      </Form>
    </div>
  );
}

export default CreateCard;
