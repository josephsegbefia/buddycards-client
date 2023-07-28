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
          Welcome to DeutschFlash!** DeutschFlash is an interactive language
          learning app designed to help you master the German language
          effortlessly. Whether you're a beginner or an advanced learner,
          DeutschFlash offers a wide range of features to enhance your language
          skills.
        </AppDescription>
      </AppInfo>
    </HomeWrapper>
  );
};

export default HomePage;
