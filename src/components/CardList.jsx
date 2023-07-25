import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import {
  Input,
  Label,
  FlashCardItem,
  FlashCardWord,
  FlashCardButton,
  FlashCardTitle,
  FlashCardPagination
} from "../layout-components/components";
import ReactPaginate from "react-paginate";

function CardList() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(5);

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
        .get(`${API_URL}/api/users/${user._id}/flashcards`, {
          // params: {
          //   offset: (currentPage - 1) * cardsPerPage,
          //   limit: cardsPerPage
          // }
        })
        .then((response) => {
          setCards(response.data);

          setTotalPages(Math.ceil(response.data.length / cardsPerPage));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [
    user
    // currentPage,
    // searchedCard.length
  ]);

  const handleSearch = (e) => {
    const word = e.target.value;
    setSearchTerm(word);
  };

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
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

          <FlashCardButton style={{ backgroundColor: "#007bff" }}>
            View
          </FlashCardButton>
          <FlashCardButton style={{ backgroundColor: "red" }}>
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
