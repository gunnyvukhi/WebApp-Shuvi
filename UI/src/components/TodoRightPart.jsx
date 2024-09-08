import { HStack, Stack } from '@chakra-ui/react'
import AvatarDropdown from './AvatarDropdown'
import MessageButton from './MessageButton'
import NotificationButton from './NotificationButton'

const TodoRightPart = () => {
  return (
    <Stack w={'100%'} h={'100%'}>
        <HStack w={'100%'} padding={'8px'} justifyContent={'space-evenly'}>
            <MessageButton />
            <NotificationButton />
            <AvatarDropdown />
        </HStack>
    </Stack>
  )
}

export default TodoRightPart