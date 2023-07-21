// src/components/Navbar.jsx

import { Link, NavLink } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context"; // <== IMPORT
import { NavBar, NavButton } from "../layout-components/components";

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
    <NavBar gutter="lg" justify="center" align="center">
      <NavLink
        className={({ isActive }) => (isActive ? "selected" : "")}
        to="/"
      >
        <NavButton>Home</NavButton>
      </NavLink>

      {/*    UPDATE     */}
      {isLoggedIn && (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? "selected" : "")}
            to="/projects"
          >
            <NavButton>Cards</NavButton>
          </NavLink>
          <NavButton onClick={logOutUser}>Logout</NavButton>
          <span>{user && user.fullName}</span>
          <span>{user && user._id}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? "selected" : "")}
            to="/signup"
          >
            <NavButton>Sign Up</NavButton>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "selected" : "")}
            to="/login"
          >
            <NavButton>Login</NavButton>
          </NavLink>
        </>
      )}
    </NavBar>
  );
}

export default Navbar;
