import { Avatar, AvatarBadge, Button, HStack, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Stack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

const MessageButton = () => {
        const initRef = React.useRef()
        return (
          <Popover closeOnBlur={false} initialFocusRef={initRef}>
            {() => (
              <>
                <PopoverTrigger>
                  <Avatar bg={'gray.200'} p={2} name="Message" src="https://img.icons8.com/?size=100&id=87048&format=png&color=3E3E3E" cursor={'pointer'}>
                      <AvatarBadge boxSize="1em" bg="red.400" />
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

export default MessageButton