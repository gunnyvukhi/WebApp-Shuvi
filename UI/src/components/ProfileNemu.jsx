import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Avatar, Button, HStack, Menu, MenuButton, MenuItem, MenuList, Portal, Stack, StackDivider, Text } from '@chakra-ui/react';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { BsChatHeart } from "react-icons/bs";
import { FaTabletScreenButton } from "react-icons/fa6";
import { IoIosArrowForward, IoMdHelpCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
const ProfileNemu = ({onLogout, token, userInfo}) => {

    ProfileNemu.propTypes = {
        onLogout: PropTypes.func.isRequired,
        token: PropTypes.string,
        userInfo: PropTypes.object.isRequired
    };

    function handleLogOut() {
        axios({
          method: "POST",
          url:"http://127.0.0.1:5000/user/logout",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            onLogout()
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}

    const initRef = React.useRef()
    console.log(userInfo)
  return (
    <Menu initialFocusRef={initRef}>
  {({ isOpen }) => (
    <>
      <MenuButton isActive={isOpen} as={Button} variant={'unstyled'}>
        <HStack>
            <Stack alignItems={'flex-start'}>
                <Text noOfLines={1} maxW={'200px'} color={'gray.200'} lineHeight={'22px'} fontSize={'16px'} transform={'auto'} translateY={'4px'}>Nguyen Tuan Anh</Text>
                <Text noOfLines={1} maxW={'200px'} color={'#4F4F4F'} lineHeight={'12px'} fontSize={'10px'} transform={'auto'} translateY={'-4px'}>gunnytuananh@gmail.com</Text>
            </Stack>
            <Avatar m={'0 4px 0 4px'} name={'Guest'} src="https://bit.ly/dan-abramov" size={'sm'}/>
            {isOpen ? <ChevronUpIcon color={'gray.200'}/> : <ChevronDownIcon color={'gray.200'}/>}
        </HStack>
        
      </MenuButton>

      <Portal>
        <MenuList borderRadius={'12px'} p={4}>
            <Stack
                boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
                padding={'16px'} borderRadius={'8px'} mb={2}
                divider={<StackDivider borderColor='gray.200' />}
            >
                <HStack justifyContent={'flex-start'} alignItems={'center'}>
                    <Text fontWeight={'600'} fontSize={'xl'} ml={1}>Dan Abrahmov</Text>
                    <Avatar size={'lg'} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                </HStack>
                <Button variant={'link'} color={'blue.500'} fontWeight={'500'} w={'fit-content'} ml={1}>
                    Chỉnh sửa thông tin cá nhân
                </Button>
            </Stack>
            
                <MenuItem
                variant={'ghost'} width={'100%'} justifyContent={'space-between'} p={3} mt={1}
                fontSize={'medium'}
                rightIcon={<IoIosArrowForward />}
                ref={initRef}
                >
                <HStack>
                    <IoSettingsOutline size={'1.6em'} />
                    <Text>Thay đổi thông tin tài khoản</Text>
                </HStack>
                </MenuItem>

                <MenuItem
                variant={'ghost'} width={'100%'} justifyContent={'space-between'} p={3} mt={1}
                fontSize={'medium'}
                rightIcon={<IoIosArrowForward />}
                ref={initRef}
                >
                    <HStack>
                        <IoMdHelpCircleOutline size={'1.7em'} />
                        <Text>Trợ giúp & hỗ trợ</Text>
                    </HStack>
                </MenuItem>

                <MenuItem
                variant={'ghost'} width={'100%'} justifyContent={'space-between'} p={3} mt={1}
                fontSize={'medium'}
                rightIcon={<IoIosArrowForward />}
                ref={initRef}
                >
                    <HStack ml={1}>
                        <FaTabletScreenButton size={'1.3em'} />
                        <Text ml={0.8}>Màn hình & giao diện</Text>
                    </HStack>
                </MenuItem>

                <MenuItem
                variant={'ghost'} width={'100%'} justifyContent={'space-between'} p={3} mt={1}
                fontSize={'medium'}
                rightIcon={<IoIosArrowForward />}
                ref={initRef}
                >
                    <HStack ml={1}>
                        <BsChatHeart size={'1.4em'} />
                        <Text>Đóng góp ý kiến</Text>
                    </HStack>
                </MenuItem>

                <MenuItem
                variant={'ghost'} width={'100%'} justifyContent={'space-between'} p={3} mt={1}
                fontSize={'medium'} onClick={handleLogOut}
                ref={initRef}
                >
                    <HStack ml={1}>
                        <TbLogout size={'1.4em'} />
                        <Text>Đăng Xuất</Text>
                    </HStack>
                </MenuItem>
                
            </MenuList>
        </Portal>
    </>
  )}
</Menu>
  )
}

export default ProfileNemu