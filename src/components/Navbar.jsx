// src/components/Navbar.jsx

import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  RiHome2Line,
  RiLoginCircleLine,
  RiUserAddLine,
  RiInformationLine,
  RiLogoutCircleLine
} from "react-icons/ri";
import { AuthContext } from "../context/auth.context";
import {
  NavbarContainer,
  NavLinks,
  NavLink
} from "../layout-components/components";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); // <== ADD

  //  Update the rendering logic to display different content
  //  depending on whether the user is logged in or not
  if (user) {
    console.log(user._id);
  }
  return (
    <NavbarContainer>
      <NavLinks>
        <NavLink>
          <Link to="/">
            <RiHome2Line /> Home
          </Link>
        </NavLink>
        <NavLink>
          <Link to="/about">
            <RiInformationLine /> About
          </Link>
        </NavLink>

        {!isLoggedIn && (
          <>
            <NavLink>
              <Link to="/signup">
                <RiUserAddLine /> Signup
              </Link>
            </NavLink>
            <NavLink>
              <Link to="/login">
                <RiLoginCircleLine /> Login
              </Link>
            </NavLink>
          </>
        )}

        {isLoggedIn && (
          <>
            <NavLink onClick={logOutUser}>
              <Link>
                <RiLogoutCircleLine /> Logout
              </Link>
            </NavLink>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
