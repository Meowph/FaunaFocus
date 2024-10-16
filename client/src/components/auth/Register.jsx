import { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/UserProfileService.jsx";

export const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
//   const [imageLocation, setImageLocation] = useState();
  const [password, setPassword] = useState();
//   const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    // if (password && password !== confirmPassword) {
    //   alert("Passwords don't match. Do better.");
    // } else {
      const userProfile = {
        firstName,
        lastName,
        displayName,
        email,
      };
      register(userProfile).then(() => {
        setIsLoggedIn(true);
        navigate("/");
      });
    // }
  };

  return (
    <Container>
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
          {/* <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup> */}
          <FormGroup>
            <Button>Register</Button>
          </FormGroup>
        </fieldset>
      </Form>
    </Container>
  );
}