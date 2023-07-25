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
    const requestBody = { word };

    if (user) {
      axios
        .post(
          `${API_URL}/api/users/${user._id}/flashcards/${cardId}/edit`,
          requestBody
        )
        .then((response) => {
          setSaveStatus("Success");
          navigate("/users/flashcards");
        })
        .catch((error) => {
          setSaveStatus("Error");
          console.log(error);
        });
    }
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
