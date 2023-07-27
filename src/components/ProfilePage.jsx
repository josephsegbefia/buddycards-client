import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { AuthContext } from "../context/auth.context";
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
  // const [user, setUser] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [goal, setGoal] = useState("");
  const [editClicked, setEditClicked] = useState(false);
  const [cards, setCards] = useState([]);

  const { userId } = useParams();
  const { user } = useContext(AuthContext);

  const API_URL = "http://localhost:5005";
  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/api/users/${user._id}/flashcards`)
        .then((response) => {
          setCards(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const handleEditClose = () => {
    setEditClicked(false);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/profile/${userId}`)
      .then((response) => {
        console.log(response.data);
        setFullName(response.data.user);
        setBio(response.data.bio);
        setLocation(response.data.location);
        setAvatarURL(response.data.avatar);
        setGoal(response.data.goal);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  console.log(avatarURL);
  // if (!user) {
  //   return (
  //     <div className="card-container">
  //       <FaSpinner />
  //     </div>
  //   );
  // }
  // console.log(cards);
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
      <h4>You have created {cards.length} cards!</h4>
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
