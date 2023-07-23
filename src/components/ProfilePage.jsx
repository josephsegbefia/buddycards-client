import { useState, useEffect } from "react";
import axios from "axios";
import {
  ProfileContainer,
  Avatar,
  FullName,
  Bio,
  Location,
  Interests,
  InterestItem,
  EditButton
} from "../layout-components/components";
import EditProfilePage from "../pages/EditProfilePage";
import ProfileNav from "./ProfileNav";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [fullName, setFullName] = useState("");
  const [user, setUser] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [goal, setGoal] = useState("");
  const [editClicked, setEditClicked] = useState(false);

  const { userId } = useParams();

  const API_URL = "http://localhost:5005";

  const handleEditClose = () => {
    setEditClicked(false);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/profile/${userId}`)
      .then((response) => {
        // console.log(response.data);
        setFullName(response.data.user);
        setBio(response.data.bio);
        setLocation(response.data.location);
        setAvatarURL(response.data.avatarURL);
        setGoal(response.data.goal);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  return (
    <ProfileContainer>
      <ProfileNav />
      <br />
      <Avatar src={avatarURL} alt="" />
      {bio ? (
        <p>Profile Complete</p>
      ) : (
        <p style={{ color: "red" }}>Complete Your Profile</p>
      )}
      <FullName>{fullName}</FullName>
      <Bio>Bio: {bio}</Bio>
      <Location>Location: {location}</Location>
      <Interests>Goal: {goal}</Interests>
      <br />
      {editClicked ? (
        <EditProfilePage handleClose={handleEditClose} />
      ) : (
        <EditButton onClick={() => setEditClicked(true)}>
          Edit Profile
        </EditButton>
      )}
    </ProfileContainer>
  );
};

export default ProfilePage;
