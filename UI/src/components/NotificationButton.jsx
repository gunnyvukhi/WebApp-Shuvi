import { Avatar, AvatarBadge } from "@chakra-ui/react";

const NotificationButton = () => {
  return (
    <Avatar bg={'gray.100'} p={2} name="Notification" src="https://img.icons8.com/?size=100&id=eMfeVHKyTnkc&format=png&color=000000">
        <AvatarBadge boxSize="1em" bg="red.500" />
    </Avatar>
  )
}

export default NotificationButton