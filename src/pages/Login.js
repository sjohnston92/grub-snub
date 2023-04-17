import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components';

//images
import FoodBack from '../images/foodBacker.jpeg'
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/dashboard")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
      <>
        <MainContainer>  
          <HeaderText>Grub Snub</HeaderText>   
          <LoginContainer>                                                                       
            <LoginForm>
              <LoginLabel htmlFor="email-address">Email Address</LoginLabel>
              <LoginInput
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />

              <LoginLabel htmlFor="password">Password</LoginLabel>
              <LoginInput
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <LoginButton onClick={onLogin}>Login</LoginButton>
            </LoginForm>
            <p className="text-sm text-white text-center"> No account yet? {' '}  
              <NavLink to="/signup"> Sign up </NavLink>
            </p>                                  
          </LoginContainer>
        </MainContainer>
        </>
    )
}

const HeaderText = styled.div`
  text-align: center;
  font-family: 'Pacifico', cursive;
  font-weight: bold;
  font-size: 66px;
  margin-bottom: 15px;
`;

const MainContainer = styled.div`
  margin: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${FoodBack});
  background-position: center;
  background-size: contain;
  align-items: center;
  border-radius: 15px;
  height: 100vh;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); 
`;

const pulsateAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const LoginContainer = styled.div`
  border-radius: 15px;
  padding: 35px;
  margin-left:20px;
  margin-right:20px;
  background: #F04D6D;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); 
  animation: ${pulsateAnimation} 2s ease-in-out infinite;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginLabel = styled.label`
  color: white;
  position: relative;
  margin-top: 15px;
`;

const LoginInput = styled.input`
  border-radius: 0.5rem;
  padding: 0.5rem;
  border: none;
  background-color: #f2f2f2;
  width:90%;

`;

const LoginButton = styled.button`
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  background-color: #FFFFFF;
  color: black;
  border: none;
  margin-top: 1rem;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #3e8e41;
  }
`;
 
export default Login