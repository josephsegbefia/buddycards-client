import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Input,
  Label,
  FlashCardItem,
  FlashCardWord,
  FlashCardButton,
  FlashCardTitle
} from "../layout-components/components";
import ReactPaginate from "react-paginate";

function CardList() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(5);

  const navigate = useNavigate();
  const { cardId } = useParams();

  const { user } = useContext(AuthContext);

  const indexOfLastPost = currentPage * cardsPerPage;
  const indexOfFirstPost = indexOfLastPost - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstPost, indexOfLastPost);

  const searchedCard = cards.filter(function (card) {
    return card.word.toLowerCase().includes(searchTerm.toLowerCase());
  });

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

  const handleSearch = (e) => {
    const word = e.target.value;
    setSearchTerm(word);
  };

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleDelete = (cardId) => {
    // Make API call to delete the card
    axios
      .post(`${API_URL}/api/users/${user._id}/flashcards/${cardId}/delete`)
      .then((response) => {
        if (response.status === 200) {
          // Filter out the deleted card from the state
          setCards((prevCards) =>
            prevCards.filter((card) => card._id !== cardId)
          );
          // Update local storage with the updated cards
          localStorage.setItem(
            "flashcards",
            JSON.stringify(cards.filter((card) => card._id !== cardId))
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flashcard-container">
      <FlashCardTitle>Your Cards</FlashCardTitle>
      <br />
      <Label>Search Cards</Label>
      <Input
        type="text"
        onChange={handleSearch}
        value={searchTerm}
        id="search"
      />

      <br />
      {searchedCard.map((card) => (
        <FlashCardItem key={card._id}>
          <FlashCardWord>{card.word}</FlashCardWord>
          <Link to={`/users/edit/flashcards/${card._id}`}>
            <FlashCardButton style={{ backgroundColor: "#FFBF00" }}>
              Edit
            </FlashCardButton>
          </Link>

          <Link to={`/users/flashcards/${card._id}`}>
            <FlashCardButton style={{ backgroundColor: "#007bff" }}>
              View
            </FlashCardButton>
          </Link>

          <FlashCardButton
            style={{ backgroundColor: "red" }}
            onClick={() => handleDelete(card._id)}
          >
            Delete
          </FlashCardButton>
        </FlashCardItem>
      ))}

      <br />
      {/* <FlashCardPagination
        onChange={paginate}
        pageCount={Math.ceil(cards.length / cardsPerPage)}
        previousLabel={"Prev"}
        nextLabel={"Next"}
        containerClassName={"pagination"}
        pageLinkClassName={"page-number"}
        previousLinkClassName={"page-number"}
        nextLinkClassName={"page-number"}
        activeClassName={"active"}
      /> */}
    </div>
  );
}

export default CardList;
