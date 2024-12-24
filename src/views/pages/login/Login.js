import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import Loading from "../../../component/Loading";
import SuccessError from '../../../component/SuccessError';
import { checkNullOrBlank } from '../../../component/CommonValidation';


const Login = () => {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState([]);
  const [error, setError] = useState([]);
  let err = [];


  // Simulated fetched user data
  const fetchedUser = {
    name: {
      firstname: "John",
      lastname: "Doe"
    },
    username: "mor_2314",
    email: "johndoe123@email.com",
    password: "83r5^_",
    phone: "1234567890",
  };

  const handleNameChange = (e) => {
    setSuccess([]);
    setError([]);
    setUserName(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setSuccess([]);
    setError([]);
    setPassword(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!checkNullOrBlank(password)) {
      err.push("User Password is required");
    }
    if (!checkNullOrBlank(userName)) {
      err.push("User Name is required");
    }
    if (err.length > 0) {
      setSuccess([]);
      setError(err);
    } else {
      setError([]);
      setLoading(true);

      // try {
      // setSuccess([]);
      // setError([]);
      //   const response = await fetch('https://fakestoreapi.com/auth/login', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       username: userName,     // mor_2314 
      //       password: password      // 83r5^_
      //     })
      //   });

      //   const data = await response.json();
      //   if (response.ok) {
      //     // Handle successful login (e.g., redirect or store token)
      //     console.log('Login successful:', data);
      //     history.push(`/pages/dashboard`);

      //   } else {
      //     // Handle login error
      //     console.error('Login failed:', data);
      //   }
      // } catch (error) {
      //   console.error('Error during login:', error);
      // }

      // due to fakestoreapi server down, used Simulating fetched user data
      if (userName === fetchedUser.username && password === fetchedUser.password) {
        setError([]);

        setUser(fetchedUser);
        console.log('Login successful:', fetchedUser);
        setTimeout(() => {
          setLoading(false);
          history.push(`/pages/dashboard`);
        }, 1000);
        // history.push(`/pages/dashboard`); 
      } else {
        setLoading(false);
        setSuccess([]);
        setError(["Login failed: Invalid username or password"]);
        console.error('Login failed: Invalid username or password');
      }
    }
  };

  return (
    <>
      {loading && <Loading start={true} />}
      <SuccessError success={success} error={error} />

      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={handleLogin}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          value={userName}
                          onChange={handleNameChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" className="px-4" type="submit">Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">Forgot password?</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
}

export default Login;
