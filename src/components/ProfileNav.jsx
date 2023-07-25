import { Link } from "react-router-dom";
import {
  RiFileListLine,
  RiFileAddLine,
  RiBookOpenLine,
  RiClipboardLine
} from "react-icons/ri";
import {
  NavbarContainer,
  NavLinks,
  NavLink
} from "../layout-components/components";

function ProfileNav() {
  return (
    <div>
      <NavbarContainer>
        <NavLinks>
          <NavLink>
            <Link to={`/users/flashcards`}>
              <RiFileListLine /> Cards
            </Link>
          </NavLink>
          <NavLink>
            <Link to="/create-card">
              <RiFileAddLine /> Create Cards
            </Link>
          </NavLink>
          <NavLink>
            <Link to="/learn">
              <RiBookOpenLine /> Learn
            </Link>
          </NavLink>
          <NavLink>
            <Link to="/practice">
              <RiClipboardLine /> Practice
            </Link>
          </NavLink>
        </NavLinks>
      </NavbarContainer>
    </div>
  );
}

export default ProfileNav;
