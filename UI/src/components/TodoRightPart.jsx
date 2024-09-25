import { HStack, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import AvatarDropdown from './AvatarDropdown'
import MessageButton from './MessageButton'
import NotificationButton from './NotificationButton'

const TodoRightPart = ({onLogout}) => {
  
  TodoRightPart.propTypes = {
    onLogout: PropTypes.func.isRequired
  };
  
  return (
    <Stack w={'100%'} h={'100%'}>
        <HStack w={'100%'} padding={'8px'} justifyContent={'space-evenly'}>
            <MessageButton />
            <NotificationButton />
            <AvatarDropdown onLogout={onLogout}/>
        </HStack>
    </Stack>
  )
}

export default TodoRightPart