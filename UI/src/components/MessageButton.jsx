
import { Avatar, AvatarBadge } from "@chakra-ui/react";

const MessageButton = () => {
  return (
    <Avatar bg={'gray.100'} p={2} name="Message" src="https://img.icons8.com/?size=100&id=87019&format=png&color=000000">
        <AvatarBadge boxSize="1em" bg="red.400" />
    </Avatar>

  )
}

export default MessageButton
