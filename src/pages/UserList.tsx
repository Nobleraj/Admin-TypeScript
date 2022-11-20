import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import UserInfo from '../components/UserInfo';

const UserList = () => {
  const userList = useAppSelector((state) => state.user.userList);
  //console.log(userList);
  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box width="50%">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <Heading color="white">User List</Heading>
          <Link to="/add-new-user">
            <Button paddingX="3rem">Add</Button>
          </Link>
        </Box>
        <Box rounded="md" bg="purple.500" color="white" px="15px" py="15px">
          <Stack spacing={8}>
            {userList.map((user) => (
              <UserInfo
                key={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                address={user.address}
                city={user.city}
                country={user.country}
                id={user.id}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default UserList;
