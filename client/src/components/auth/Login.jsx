import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/UserProfileService";

//Fetch call not working when trying to Login or Register?
//MAKE SURE BACKEND IS RUNNING!!!

export const Login = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email})
      .then(r =>{
      if(r){
      setIsLoggedIn(true)
      navigate('/')
      }
      else{
        alert("Invalid email")
      }
    })
  };

  return (
    <Form onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        {/* <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup> */}
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
  );
}