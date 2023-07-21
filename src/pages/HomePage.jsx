import React from "react";
import LoginPage from "./LoginPage";
import {
  HomeWrapper,
  AppInfo,
  AppTitle,
  AppDescription
} from "../layout-components/components";

const HomePage = () => {
  return (
    <HomeWrapper>
      <AppInfo>
        <AppTitle>Welcome to Our App</AppTitle>
        <AppDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget
          arcu tellus. Sed in justo vel lectus fermentum rhoncus nec et lectus.
        </AppDescription>
      </AppInfo>
    </HomeWrapper>
  );
};

export default HomePage;
