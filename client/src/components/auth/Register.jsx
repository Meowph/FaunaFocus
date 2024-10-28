import { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/UserProfileService.jsx";

export const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();

  const registerClick = (e) => {
    e.preventDefault();
      const userProfile = {
        firstName,
        lastName,
        displayName,
        email,
      };
      register(userProfile).then(() => {
        navigate("/login");
      });
    // }
  };

  return (
    <Container style={{ width: '500px', border: 'double #6cd871', backgroundColor: 'white', marginLeft: '45rem', marginBottom: '5rem' }}>
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
            <Button type="submit">Register</Button>
          </FormGroup>
      </fieldset>
    </Form>
    <Link style={{ color: '#2E8B57' }} to={"/login"}>Go Back To Log In</Link>
  </Container>
  );
}