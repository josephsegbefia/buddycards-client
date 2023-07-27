import { useState } from "react";
import { AuthContext } from "../context/auth.context";
import PracticeCard from "./PracticeCard";
import { CSSTransition } from "react-transition-group";
import "../flippable-card.css";

const API_URL = "http://localhost:5005";

function Practice() {
  const [showFront, setShowFront] = useState(true);

  return (
    <div className="flippable-card-container">
      <CSSTransition in={showFront} timeout={300} classNames="flip">
        <PracticeCard
          onClick={() => {
            setShowFront((v) => !v);
          }}
        />
      </CSSTransition>
    </div>
  );
}

export default Practice;
