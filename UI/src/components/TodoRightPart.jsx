import { HStack, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import AvatarDropdown from './AvatarDropdown'
import MessageButton from './MessageButton'
import NotificationButton from './NotificationButton'

const TodoRightPart = ({onLogout, token, data}) => {
  
  TodoRightPart.propTypes = {
    onLogout: PropTypes.func.isRequired,
    token: PropTypes.string,
    data: PropTypes.object.isRequired
  };
  return (
    <Stack w={'100%'} h={'100%'}>
        <HStack w={'100%'} padding={'8px'} justifyContent={'space-evenly'}>
            <MessageButton />
            <NotificationButton />
            <AvatarDropdown token={token} userInfo={data.user_info} onLogout={onLogout}/>
        </HStack>
    </Stack>
  )
}

export default TodoRightPart