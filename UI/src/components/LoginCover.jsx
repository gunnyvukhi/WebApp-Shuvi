import { Link, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const MotionStack = motion(Stack);
const variant = {
    in: {opacity: 1, transition: {duration: 0.5, delay: 0.5}, display: 'flex'},
    out: {opacity: 0, transition: {duration: 0.5}, display: 'none'},
  };

function LoginCover({state, onChange}) {
    const variants = {
        left: {x: -520, borderRadius: '32px 0 0 32px'},
        right: {x: 0, borderRadius: '0 32px 32px 0'},
      };

    return (
        <MotionStack
                display={'flex'} justifyContent={'center'} flexWrap={'nowrap'} alignItems={'center'} marginLeft={'520px'}
                overflow={'hidden'} position={'absolute'} opacity={0.9} h={"100%"} w={'520.8px'}
                bg={'blue.300'} transitionDuration={'1s'} transitionTimingFunction={'ease-out'}
                animate={state ? "right" : "left"} variants={variants}
        >
            <MotionStack position={'absolute'} animate={state ? "in" : "out"} variants={variant}>
                <Text fontSize={'4xl'} w={'526px'} color={'white'} textAlign={'center'}>Chưa có tài khoản ?</Text>
                <Link fontSize={'2xl'} w={'526px'} color={'white'} textAlign={'center'} onClick={onChange}>Đăng Kí tại đây</Link>
                <br></br>
                <Text fontSize={'3xl'} w={'526px'} color={'white'} textAlign={'center'}>Hoặc đăng nhập bằng</Text>
            </MotionStack>
            <MotionStack position={'absolute'} animate={state ? "out" : "in"} variants={variant} display={'none'}>
                <Text fontSize={'4xl'} w={'526px'} color={'white'} textAlign={'center'}>Đã có tài khoản ?</Text>
                <Link fontSize={'2xl'} w={'526px'} color={'white'} textAlign={'center'} onClick={onChange}>Đăng Nhập Ngay</Link>
                <br></br>
                <Text fontSize={'3xl'} w={'526px'} color={'white'} textAlign={'center'}>Hoặc đăng nhập bằng</Text>
            </MotionStack>
        </MotionStack>
    );
}

LoginCover.propTypes = {
    state: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default LoginCover;