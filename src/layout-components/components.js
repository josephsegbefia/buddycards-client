import styled from "styled-components";
import { spacingMap, justifyAlignMap, fractions } from "./spacing";

export const NavBar = styled.div`
  --gutter: ${(props) => spacingMap[props.gutter] ?? spacingMap.lg};
  display: flex;
  flex-wrap: wrap;
  gap: var(--gutter);

  justify-content: ${(props) =>
    justifyAlignMap[props.justify] ?? justifyAlignMap.start};

  align-items: ${(props) =>
    justifyAlignMap[props.align] ?? justifyAlignMap.start};
  height: 3rem;
  background-color: white;
`;

export const NavButton = styled.a`
  color: tomato;
  font-family: "Rokkitt", serif;
  font-size: 1.5rem;
  text-decoration: none;
  cursor: pointer;
`;

export const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const AppInfo = styled.div`
  flex: 1;
  padding: 20px;
`;

export const AppTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

export const AppDescription = styled.p`
  font-size: 18px;
`;

export const Form = styled.form`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Header = styled.h3`
  text-align: center;
`;
