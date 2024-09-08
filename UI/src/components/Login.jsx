import { Button, Container, FormControl, FormErrorMessage, Heading, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const MotionContainer = motion(Container);

const variants = {
  in: {opacity: 1, transition: {duration: 0.5, delay: 0.5}, display: 'block'},
  out: {opacity: 0, transition: {duration: 0.5}, display: 'none'},
};

const Login = ({state}) => {

  Login.propTypes = {
    state: PropTypes.bool.isRequired
  };

  function validateEmail(value) {
    let error
    // eslint-disable-next-line no-useless-escape
    if(value && (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) {
      error = 'Email không hợp lệ';
    }
    return error
  }

  const [showPassword, setShowPassword] = useState(false)

  function validatePassword(value) {
    let error
    // eslint-disable-next-line no-useless-escape
    if(value && (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/))) {
      error = 'Mật khẩu không hợp lệ';
    }
    return error
  }

  return (
  <MotionContainer position={'absolute'} animate={state ? "in" : "out"} variants={variants}>
    <Container>
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={(values, actions) => {
        setTimeout( async () => {
          try{
            const response = await fetch('http://127.0.0.1:5000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(values)
            })
            const data = await response.json()
            console.log(data)
          } catch (error) {
            console.error('Error:', error)
          }
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props) => (
        <Form display={"flex"} >
          <Heading margin={"8px 0px 16px 0px"} as='h1' size={'lg'} textAlign={'center'} minW={"200px"}>Đăng nhập</Heading>
          
          <Field name='email' validate={validateEmail}>
            {({ field, form }) => (
              <FormControl isInvalid={(form.errors.email && form.touched.email)}>
                <InputGroup w={'440px'}>
                  <InputLeftElement pointerEvents={'none'}>
                    <MdOutlineEmail size={28} color='gray.300' />
                  </InputLeftElement>
                  <Input {...field} variant='flushed' type='email' boxShadow={"0px 0px 0px 0px !important"} placeholder='Email'/>
                </InputGroup>
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name='password' validate={validatePassword}>
            {({ field, form }) => (
              <FormControl margin={'16px 0px 0px 0px'} isInvalid={form.errors.password && form.touched.password}>
                <InputGroup w={'440px'}>
                  <InputLeftElement pointerEvents={'none'}>
                    <RiLockPasswordLine size={28} color='gray.300'/>
                  </InputLeftElement>
                  <Input
                    {...field}
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    variant='flushed'
                    boxShadow={"0px 0px 0px 0px !important"}
                    placeholder='Passwords'
                  
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? 'Hiện' : 'Ẩn'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          
          <Button
            mt={4}
            colorScheme='teal'
            // eslint-disable-next-line react/prop-types
            isLoading={props.isSubmitting}
            type='submit'
            margin={'24px 4px 16px 0px'}
            float={'right'}
          >
            Đăng nhập
          </Button>
        </Form>
      )}
    </Formik>
    </Container>
  </MotionContainer>
  )
}
export default Login