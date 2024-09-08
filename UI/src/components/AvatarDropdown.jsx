import { Avatar, AvatarBadge, Button, HStack, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Stack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react';
import { BsChatHeart } from "react-icons/bs";
import { FaTabletScreenButton } from "react-icons/fa6";
import { IoIosArrowForward, IoMdHelpCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";


const AvatarDropdown = () => {
        const initRef = React.useRef()
        return (
          <Popover closeOnBlur={false} initialFocusRef={initRef}>
            {({ isOpen }) => (
              <>
                <PopoverTrigger>
                    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" cursor={'pointer'}>
                        {isOpen || <AvatarBadge boxSize="1em" bg="green.500" />}
                    </Avatar>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent borderRadius={'12px'}>
                  <PopoverArrow />
                    <PopoverHeader>
                        <Stack
                            boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
                            padding={'16px'} borderRadius={'8px'}
                            divider={<StackDivider borderColor='gray.200' />}
                        >
                            <HStack justifyContent={'flex-start'} alignItems={'center'}>
                                <Avatar size={'lg'} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                                <Text fontWeight={'600'} fontSize={'xl'} ml={1}>Dan Abrahmov</Text>
                            </HStack>
                            <Button variant={'link'} color={'blue.500'} fontWeight={'500'} w={'fit-content'} ml={1}>
                                Chỉnh sửa thông tin cá nhân
                            </Button>
                        </Stack>
                    </PopoverHeader>
                    <PopoverBody>
                        <Button
                        variant={'ghost'} width={'100%'} justifyContent={'space-between'} p={3} mt={1}
                        fontSize={'medium'}
                        rightIcon={<IoIosArrowForward />}
                        ref={initRef}
                      >
                        <HStack>
                            <IoSettingsOutline size={'1.6em'} />
                            <Text>Thay đổi thông tin tài khoản</Text>
                        </HStack>
                        </Button>

                        <Button
                        variant={'ghost'} width={'100%'} justifyContent={'space-between'} p={3} mt={1}
                        fontSize={'medium'}
                        rightIcon={<IoIosArrowForward />}
                        ref={initRef}
                        >
                            <HStack>
                                <IoMdHelpCircleOutline size={'1.7em'} />
                                <Text>Trợ giúp & hỗ trợ</Text>
                            </HStack>
                        </Button>

                        <Button
                        variant={'ghost'} width={'100%'} justifyContent={'space-between'} p={3} mt={1}
                        fontSize={'medium'}
                        rightIcon={<IoIosArrowForward />}
                        ref={initRef}
                        >
                            <HStack ml={1}>
                                <FaTabletScreenButton size={'1.3em'} />
                                <Text ml={0.8}>Màn hình & giao diện</Text>
                            </HStack>
                        </Button>

                        <Button
                        variant={'ghost'} width={'100%'} justifyContent={'space-between'} p={3} mt={1}
                        fontSize={'medium'}
                        rightIcon={<IoIosArrowForward />}
                        ref={initRef}
                        >
                            <HStack ml={1}>
                                <BsChatHeart size={'1.4em'} />
                                <Text>Đóng góp ý kiến</Text>
                            </HStack>
                        </Button>

                        <Button
                        variant={'ghost'} width={'100%'} justifyContent={'space-between'} p={3} mt={1}
                        fontSize={'medium'}
                        ref={initRef}
                        >
                            <HStack ml={1}>
                                <TbLogout size={'1.4em'} />
                                <Text>Đăng Xuất</Text>
                            </HStack>
                        </Button>

                    </PopoverBody>
                    <PopoverFooter fontSize={'x-small'}>
                        Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn quảng cáo · Cookie · Shuvi © 2024
                    </PopoverFooter>
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>
        )
      }

export default AvatarDropdown