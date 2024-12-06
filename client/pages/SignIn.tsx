import { Box, Button, Input, Stack, Heading, Text } from "@chakra-ui/react";
import { Field } from "../src/components/ui/field";
import { Link } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from 'react';
import { login } from '../src/api/authAPI';
import Auth from '../src/utils/auth';

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
    zipCode: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      setErrorMessage('');
      Auth.login(data.token);
      localStorage.setItem("firstLogin", "true");
      console.log(data.token);
      //console.log(token);
    } catch (err) {
      console.error('Failed to login', err);
      setErrorMessage('Failed to login');
    }
  };
 
  return (
    <>
     <Box bg="black" className="dark"
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            minHeight="100vh" 
            bgGradient="linear(to-r, gray.50, teal.100)"
            p={4}
        >
      
      <div className="login-form-container">
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} boxShadow="md">
        <Box mb={4}>
          <Heading size="md">Login</Heading>
          <Text fontSize="sm" color="gray.600">
            Fill in the form below to login
          </Text>
        </Box>

        <Box>
        <form onSubmit={handleSubmit}>
            <Stack >
              <Field label="User Name">
                <Input name="userName" type="text" onChange={handleChange}/>
              </Field>

              <Field label="Password">
              <Input name="password" type="password" onChange={handleChange} />
              {errorMessage && <p className= 'error-message'>{errorMessage}</p>}
              </Field>
            </Stack>
        <Box display="flex" justifyContent="center" mt={4}>

          <Button type="submit">
            Sign in
          </Button>
          <Link to="/">
            <Button variant="outline" ml={3} className="cancel-button">
              Cancel
            </Button>
          </Link>

        </Box>
          </form>
        </Box>

      </Box>
      </div>
      </Box>
    </>
  );
};

export default SignIn;
