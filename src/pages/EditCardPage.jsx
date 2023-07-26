import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import {
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  Header,
  FlashCardTitle
} from "../layout-components/components";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditCardPage(props) {
  const [word, setWord] = useState("");
  const [saveStatus, setSaveStatus] = useState("Ready");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cardId } = useParams();

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/api/users/${user._id}/flashcards/${cardId}`)
        .then((response) => {
          const oneCard = response.data;
          setWord(oneCard.word);
        })
        .catch((error) => console.log(error));
    }
  }, [cardId]);

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
          .post(
            `${API_URL}/api/users/${user._id}/flashcards/${cardId}/edit`,
            requestBody
          )
          .then((response) => {
            setSaveStatus("Success");
            console.log(response.data);
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

    setWord("");
  };

  return (
    <div className="form-container">
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

        {/* <SubmitButton type="submit">Update</SubmitButton> */}
        {
          {
            Saving: (
              <SubmitButton value="Creating..." type="submit" disabled>
                Updating Card...
              </SubmitButton>
            ),
            Success: (
              <SubmitButton value="Saved" type="submit" disabled>
                Card Updated!
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
                Update
              </SubmitButton>
            )
          }[saveStatus]
        }
      </Form>
    </div>
  );
}

export default EditCardPage;
