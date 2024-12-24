import React, { useEffect, useState } from 'react';
import { CButton, CCard, CCardBody, CContainer, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow, CCol, CLabel } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import '../../../css/account.css';
import Loading from "../../../component/Loading";
import SuccessError from '../../../component/SuccessError';
import { checkNullOrBlank, nullChk, validateName, validateEmail, validatePwd } from '../../../component/CommonValidation';


const Account = () => {
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState({
        name: {
            firstname: "",
            lastname: ""
        },
        email: "",
        password: "",
        phone: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState([]);
    const [error, setError] = useState([]);
    let err = [];

    // Fetch user data
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);

        const fetchUserData = async () => {
            try {
                // const response = await fetch('https://fakestoreapi.com/users/1');
                // const data = await response.json();
                // setUser(data);

                // due to fakestoreapi server down, used Simulating fetched user data
                const fetchedUser = {
                    name: {
                        firstname: "John",
                        lastname: "Doe"
                    },
                    email: "johndoe123@email.com",
                    password: "83r5^_",
                    phone: "1234567890",
                };
                setUser(fetchedUser);

            } catch (error) {
                setSuccess([]);
                setError(error);
                console.error('Error fetching user data:', error);
            } finally {
                console.log('Success fetching user data:', success);
            }
        };

        fetchUserData();
    }, []);

    const handleEmailChange = (e) => {
        setSuccess([]);
        setError([]);
        setUser({ ...user, email: e.target.value })
    }

    const handlePasswordChange = (e) => {
        setSuccess([]);
        setError([]);
        setUser({ ...user, password: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nullChk(user.email)) {
            err.push("please fill email");
        } else if (!validateEmail(user.email)) {
            err.push("! invalid email format. pls fill email format.")
        }
        if (!nullChk(user.password)) {
            err.push("please fill password");
        } else if (!validatePwd(user.password)) {
            err.push("! invalid password format. <br/> password must be at least 8 words and included a-z, A-Z, 0-9, @#$% ")
        }

        if (err.length > 0) {
            setSuccess([]);
            setError(err);
        } else {

            setSuccess(["User data submitted"]);
            setError([]);
            console.log('User data submitted:', user);
        }
    };

    const toggleShowPassword = () => {
        setError([]);
        setSuccess([]);
        setShowPassword(!showPassword);
    };

    return (
        <>
            {loading && <Loading start={true} />}
            <SuccessError success={success} error={error} />

            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="6">
                        <CCard>
                            <CCardBody>
                                <CForm onSubmit={handleSubmit}>
                                    <h1>Account Details</h1>
                                    <CRow className="">
                                        <CCol>
                                            <CLabel>First Name : </CLabel><br />
                                        </CCol>
                                        <CCol>
                                            <CLabel>Last Name : </CLabel><br />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CCol>
                                            <CInput
                                                type="text"
                                                placeholder="First Name"
                                                value={user.name.firstname}
                                                readOnly
                                            />
                                        </CCol>
                                        <CCol>
                                            <CInput
                                                type="text"
                                                placeholder="Last Name"
                                                value={user.name.lastname}
                                                readOnly
                                            />
                                        </CCol>
                                    </CRow>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-envelope-closed" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput
                                            type="email"
                                            placeholder="Email"
                                            value={user.email}
                                            onChange={handleEmailChange}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-phone" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput
                                            type="text"
                                            placeholder="Phone"
                                            value={user.phone}
                                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-lock-locked" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            value={user.password}
                                            onChange={handlePasswordChange}
                                        />
                                    </CInputGroup>
                                    <CRow className="mb-3 ml-1">
                                        <CCol md="8"></CCol>
                                        <CCol md="4">
                                            <CRow>
                                                <CInput
                                                    type="checkbox"
                                                    id="showPassword"
                                                    className="custom-checkbox"
                                                    checked={showPassword}
                                                    onChange={toggleShowPassword}
                                                />
                                                <CLabel htmlFor="showPassword" className=" custom-label non-selectable">
                                                    Show Password
                                                </CLabel>
                                            </CRow>
                                        </CCol>
                                    </CRow>
                                    <CButton color="primary" type="submit">Update Account</CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </>
    );
};

export default Account;
