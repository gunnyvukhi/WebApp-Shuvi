import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Radio,
  RadioGroup,
  Select
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaPhone } from 'react-icons/fa';

const MotionContainer = motion(Container);

const variants = {
  in: {opacity: 1, transition: {duration: 0.5, delay: 0.5}, display: 'block'},
  out: {opacity: 0, transition: {duration: 0.5}, display: 'none'},
};

const city = [[],
              [{name: 'Hà Nôi', value: 1},{name: 'Hồ Chí Minh', value: 2},{name: 'Hải Phòng', value: 3}],
              [{name:'San Francisco', value: 10}, {name:'washington', value: 11}, {name:'Texas', value: 12}]]


function Register({state}) {

  Register.propTypes = {
    state: PropTypes.bool.isRequired
  };

  function validateRequired(value) {
    let error
    if (!value) {
      error = 'Xin hãy điền họ và tên';
    }
    return error
  }

  function validateEmail(value) {
    let error
    if (!value) {
      error = 'Không thể bỏ trống Email'
    // eslint-disable-next-line no-useless-escape
    } else if(!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      error = 'Email không hợp lệ';
    }
    return error
  }

  const [country, setCountry] = useState(0);
  const [cityId, setCityId] = useState(0);

  function validateRegion(value) {
    let error
    if (!value) {
      error = 'Không thể bỏ trống phần này';
    }
    setCityId(value)
    return error
  }
  
  function validateMobile(value) {
    let error
    if (!value) {
      error = 'Vui lòng nhập số điện thoại'
    // eslint-disable-next-line no-useless-escape
    } else if(!value.match(/^\d{6,15}$/)) {
      error = 'Số điện thoại không hợp lệ';
    }
    return error
  }

  const [gender, setGender] = useState('1')

  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [password, setPassword] = useState('')

  function validatePassword(value) {
    let error
    if (!value) {
      error = 'Vui lòng nhập Mật khẩu'
    // eslint-disable-next-line no-useless-escape
    } else if(!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{1,}$/)) {
      error = 'Mật khẩu phải bao gồm ít nhất 1 chữ cái in hoa, 1 chữ cái thường, 1 chữ số và 1 kí tự đặc biệt';
    } else if (value.length < 8){
      error = 'Mật khẩu phải gồm ít nhất 8 kí tự'
    }
    setPassword(value)
    return error
  }

  function validatePasswordConfirm(value) {
    let error
    if (!value) {
      error = 'Vui lòng nhập lại Mật khẩu'
    } else if (value !== password){
      error = 'Mật khẩu không khớp'
    }
    return error
  }

  

  return (
  <MotionContainer position={'absolute'} animate={state ? "in" : "out"} variants={variants} display={'none'}>
    <Container>
    <Formik
      initialValues={{ name: '' , email: '', birth:'', regionId: '', mobile: '', gender: 'Nam', password: '', passwordConfirm: ''}}
      onSubmit={(values, actions) => {
        setTimeout(async () => {
          try {
          const response = await fetch('http://127.0.0.1:5000/register', {
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
        <Form display={"flex"}>
          <Heading margin={"0px 0px 8px 0px"} as='h1' size={'lg'} textAlign={'center'} minW={'200px'}>Đăng kí</Heading>
          <HStack display={"flex"} >
          <Field name='name' validate={validateRequired} >
            {({ field, form }) => (
              <FormControl minW={'216px'} isInvalid={form.errors.name && form.touched.name}>
                <FormLabel margin={"8px 0px 0px 0px"} >Họ và tên</FormLabel>
                <Input {...field} variant='flushed' boxShadow={"0px 0px 0px 0px !important"} placeholder='Nguyễn Văn A' />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name='email' validate={validateEmail}>
            {({ field, form }) => (
              <FormControl marginLeft={"16px"} minW={'216px'} isInvalid={(form.errors.email && form.touched.email)}>
                <FormLabel margin={"8px 0px 0px 0px"}>Email</FormLabel>
                <Input {...field} variant='flushed' boxShadow={"0px 0px 0px 0px !important"} type='email' placeholder='NguyenVanA@gmail.com'/>
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          </HStack>
          <HStack>
            <Field name='birth' validate={validateRequired}>
              {({ field, form }) => (
                <FormControl width={"40%"} isInvalid={(form.errors.birth && form.touched.birth)}>
                  <FormLabel margin={"8px 0px 0px 0px"} >Ngày sinh</FormLabel>
                  <Input {...field} variant='flushed' boxShadow={"0px 0px 0px 0px !important"} type='date'/>
                  {/* <FormErrorMessage></FormErrorMessage> */}
                </FormControl>
              )}
            </Field>

            <Field name='countryId'>
              {({ field, form }) => (
                <FormControl isInvalid={((!country) && form.touched.countryId)}>
                  <FormLabel margin={"8px 0px 0px 8px"}>Quốc tịch</FormLabel>
                  <Select {...field} margin={"0px 0px 0px 8px"} onChange={(e) => {setCountry(e.target.value); setCityId(0)}} value={country}>
                    <option value={0} disabled={country}>Quốc gia</option>
                    <option value={1}>Việt Nam</option>
                    <option value={2}>Nhật Bản</option>
                  </Select>
                  {/* <FormErrorMessage>Todo</FormErrorMessage>*/}
                </FormControl>
              )}
            </Field>
            <Field name='regionId' validate={validateRegion}>
              {({ field, form }) => (
                <FormControl isInvalid={((!cityId) && form.touched.regionId)}>
                  <FormLabel margin={"8px 0px 0px 8px"}>Nơi sinh sống</FormLabel>
                  <Select {...field} margin={"0px 0px 0px 8px"} value={cityId}>
                    <option value={0} disabled={cityId}>Thành phố</option>
                      {city[country].map((e) => {
                        if (!e) { return null }
                        return(
                        <option key={e.value} value={e.value}>{e.name}</option>
                        )})}
                  </Select>
                  {/* <FormErrorMessage></FormErrorMessage> */}
                </FormControl>
              )}
            </Field>
          </HStack>

          <HStack>
          <Field name='mobile' validate={validateMobile}>
            {({ field, form }) => (
              <FormControl width={'120%'} isInvalid={(form.errors.mobile && form.touched.mobile)}>
                <FormLabel margin={"8px 0px 0px 0px"}>Số điện thoại</FormLabel>
                <InputGroup>
                  <InputLeftAddon width={"60px"}>+84</InputLeftAddon>
                  <InputLeftElement pointerEvents={'none'} marginLeft={"60px"}>
                    <FaPhone color='gray.300'/>
                  </InputLeftElement>
                  <Input {...field} variant='flushed' boxShadow={"0px 0px 0px 0px !important"} type='tel' placeholder='Số điện thoại'/>
                </InputGroup>
                <FormErrorMessage>{form.errors.mobile}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          
          <Field name='gender'>
            {({field}) => (
              <FormControl>
                <FormLabel margin={"8px 0px 0px 8px"} >Giới tính</FormLabel>
                <RadioGroup {...field} onChange={setGender} value={gender}>
                  <HStack margin={'8px 0px 0px 8px'} spacing='5%'>
                    <Radio {...field} value='1'>Nam</Radio>
                    <Radio {...field} value='2'>Nữ</Radio>
                    <Radio {...field} value='3'>Khác</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            )}
          </Field>
          </HStack>

          <Field name='password' validate={validatePassword}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.password && form.touched.password}>
                <FormLabel margin={"8px 0px 0px 0px"}>Mật Khẩu</FormLabel>
                <InputGroup size='md'>
                  <Input
                    {...field}
                    variant='flushed' boxShadow={"0px 0px 0px 0px !important"}
                    pr='4.5rem'
                    type={showPassword1 ? 'text' : 'password'}
                    placeholder='Gồm chữ in hoa, chữ thường, số và kí tự đặc biệt'
                    value={password}
                  
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setShowPassword1(!showPassword1)}>
                      {showPassword1 ? 'Hiện' : 'Ẩn'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          
          <Field name='passwordConfirm' validate={validatePasswordConfirm}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.passwordConfirm && form.touched.passwordConfirm}>
                <InputGroup margin={"8px 0px 0px 0px"} size='md'>
                  <Input
                    {...field}
                    variant='flushed' boxShadow={"0px 0px 0px 0px !important"}
                    pr='4.5rem'
                    type={showPassword2 ? 'text' : 'password'}
                    placeholder='Nhập lại mật Khẩu'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setShowPassword2(!showPassword2)}>
                      {showPassword2 ? 'Hiện' : 'Ẩn'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{form.errors.passwordConfirm}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            mt={4}
            colorScheme='teal'
            // eslint-disable-next-line react/prop-types
            isLoading={props.isSubmitting}
            type='submit'
            margin={'16px 4px 16px 0px'}
            float={'right'}
          >
            Đăng kí
          </Button>
        </Form>
      )}
    </Formik>
    </Container>
  </MotionContainer>
  )
}
export default Register