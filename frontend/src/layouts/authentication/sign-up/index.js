// react-router-dom components
import { useNavigate, Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpg";

import { useState } from 'react'
import { useMaterialUIController } from 'context';
import { signup } from "../../../services/authServices";

function Cover() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const [controller, dispatch, token, setToken] = useMaterialUIController();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const verifyFormData = () => {
    let verified = true

    if (user.password !== user.confirmPassword) {
      verified = false;
    }

    return verified;
  }

  const handleSubmit = async (e) => {
    if (!verifyFormData()) {
      alert("Passwords do not match");
      return;
    }

    let signupReqBody = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    }

    signup(signupReqBody).then((res) => {
      // Singin successfull        
      setToken(res.token);
      // Set the token to the local storage
      localStorage.setItem('token', res.token);
      // redirect the user to the dashboard
      navigate('/dashboard');
    })
      .catch((err) => {
        console.log("error: ", err);
      });

  };


  if (token) {
    navigate('/dashboard');
    return null;
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Firstname" variant="standard" fullWidth id="firstname" onChange={handleChange} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Lastname" variant="standard" fullWidth id="lastname" onChange={handleChange} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth id="email" onChange={handleChange} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth id="password" onChange={handleChange} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Confirm Password" variant="standard" fullWidth id="confirmPassword" onChange={handleChange} />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}                
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient                
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
