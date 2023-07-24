import styled from "styled-components";
import {
  RiHome2Line,
  RiLoginCircleLine,
  RiUserAddLine,
  RiInformationLine
} from "react-icons/ri";

export const NavbarContainer = styled.nav`
  // background-color: ;
  padding: 1rem;
`;

export const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  padding: 0;
`;

export const NavLink = styled.li`
  padding: 0.5rem;
  color: white;
  font-size: 1.2rem;
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

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const InputField = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  max-width: 300px;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

export const EditSubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

//PROFILE PAGE
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const FullName = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

export const Bio = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: #666;
`;

export const Location = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: #666;
`;

export const Interests = styled.ul`
  list-style: none;
  padding: 0;
`;

export const InterestItem = styled.li`
  font-size: 14px;
  margin-bottom: 5px;
  color: #777;
`;

export const EditButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;
