import { Container, Image, Stack } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useState } from 'react';
import Login from './components/Login';
import LoginCover from './components/LoginCover';
import Register from './components/Register';

const MotionStack = motion(Stack);
const variantsLogin = {
  login: {x: 0, borderRadius: '32px 0 0 32px'},
  register: {x: 520, borderRadius: '0 32px 32px 0'},
};

const LoginScreen = () => {
  const [ state, setState ] = useState(true)

  return (
    <Stack minW={'100vw'} minH={'100vh'}>
        <Container  maxWidth={{base: "96vw", sm: "480px", md: "720px", lg: "992px", xl: "1080px"}}
                    maxH={{base: "96vw", sm: "480px", md: "720px", lg: "992px", xl: "640px"}}
                    margin={'auto'}
                    transform={{base: 'none', md: 'translateX(32px)'}}
                    
        >
          <Stack direction={{base: 'column', md: 'row'}} h={'600px'} w={'1040px'} spacing={0}>
            <MotionStack
              display={'flex'} justifyContent={'center'} alignItems={'center'} flexWrap={'nowrap'}
              overflow={'hidden'} position={'absolute'} h={"100%"} w={'520.8px'}
              bg={'white'} transitionDuration={'1s'} transitionTimingFunction={'ease-out'}
              animate={state ? "login" : "register"}
              variants={variantsLogin}
            >
              <Login state={state} />
              <Register state={!state} />

            </MotionStack>
            <LoginCover state={state} onChange={() => setState(!state)}/>
          </Stack>
        </Container>
      <Image boxSize={'100%'}  objectFit={'cover'} position={'fixed'} zIndex={'-1'} src="https://images3.alphacoders.com/819/819294.png" alt='Login'/>
    </Stack>
  )
}

export default LoginScreen