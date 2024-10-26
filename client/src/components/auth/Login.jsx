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
      navigate('/home')
      }
      else{
        alert("Invalid email")
      }
    })
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <Form style={{ width: '300px', border:'double, #6cd871', padding:'10px',  marginLeft:'50rem', marginBottom:'10rem' }} onSubmit={loginSubmit}>
      <fieldset>
        <h5 style={{marginBottom: '10px', textAlign: 'center', textDecoration:'underline' }}>Welcome to Fauna Focus!</h5>
        <p style={{ textAlign: 'center'}}>~ Bringing More Awareness To The Wilderness Around Us ~</p>
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
          Not registered? <Link style={{color:'#2E8B57'}} to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
    </div>
  )
}