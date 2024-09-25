import { Avatar, AvatarBadge } from "@chakra-ui/react";

const NotificationButton = () => {
  return (
    <Avatar bg={'gray.200'} p={2} name="Notification" src="https://img.icons8.com/?size=100&id=62atSgaif9UE&format=png&color=3E3E3E">
        <AvatarBadge boxSize="1em" bg="red.500" />
    </Avatar>
  )
}

export default NotificationButton