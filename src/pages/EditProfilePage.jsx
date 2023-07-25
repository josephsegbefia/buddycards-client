import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { default as ReactSelect } from "react-select";

import { useParams } from "react-router-dom";

import {
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  Interests
} from "../layout-components/components";

const API_URL = "http://localhost:5005";

function EditProfilePage({ handleClose }) {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [goal, setGoal] = useState("");
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  // Newly added
  const [saveStatus, setSaveStatus] = useState("Ready");
  //

  const { userId } = useParams();

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const requestBody = { bio, location, goal };

  const getFields = async () => {
    try {
      let response = await axios.get(`${API_URL}/api/profile/${userId}`);
      console.log("Response Data ===>", response.data);
      let data = response.data;

      // Provide default values in case the data is not available
      setBio(response.data.bio || "");
      setLocation(response.data.location || "");
      setGoal(response.data.goal || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFields();
  }, [userId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Newly Added
    setSaveStatus("Saving");

    axios
      .post(`${API_URL}/api/setup-profile/${userId}`, requestBody)
      .then((response) => {
        setSaveStatus("Success");
        console.log("profile updated", response.data);
      })
      .catch((error) => {
        // Newly Added
        setSaveStatus("Error");
        console.log(error);
      });
    forceUpdate();
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label>Bio: </Label>
          <Input
            type="text"
            placeholder="A little something about yourself"
            name="bio"
            onChange={handleBioChange}
            value={bio}
          />
        </FormGroup>
        <FormGroup>
          <Label>Location:</Label>
          <Input
            type="text"
            placeholder="e.g: Accra, Ghana"
            name="location"
            onChange={handleLocationChange}
            value={location}
          />
        </FormGroup>
        <FormGroup>
          <Label>Avatar:</Label>
          <Input type="file" name="profile-avatar" />
        </FormGroup>
        <FormGroup>
          <Label>Goal:</Label>
          <Input
            type="text"
            name="goal"
            placeholder="Learn 50 words per week"
            onChange={handleGoalChange}
            value={goal}
          />
        </FormGroup>
        {/* <SubmitButton type="submit">Save</SubmitButton> */}
        {
          {
            Saving: (
              <SubmitButton value="Saving..." type="submit" disabled>
                Saving...
              </SubmitButton>
            ),
            Success: (
              <SubmitButton value="Saved" type="submit" disabled>
                Saved!
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
                Save
              </SubmitButton>
            )
          }[saveStatus]
        }
        <br />
        <SubmitButton style={{ backgroundColor: "red" }} onClick={handleClose}>
          Close
        </SubmitButton>
      </Form>
    </div>
  );
}

export default EditProfilePage;
