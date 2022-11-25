import { Box, Button, Flex, Heading, Stack,Alert,AlertIcon,Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import UserInfo from '../components/UserInfo';
import { fetchUser } from "../redux/userSlice";

const UserList = () => {
  const { userList, isLoading, userName } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  console.log(isLoading, userName);
  const loadUserHandler = () => {
    dispatch(fetchUser());
  }
  return (
    <Flex
      height="100%"
      marginTop='80px'
      marginBottom='50px'
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
          <Box>
          <Link to="/add-new-user">
            <Button paddingX="2rem">Add</Button>
          </Link>
          <Button data-testid='button' marginLeft="15px" paddingX="2rem" onClick={loadUserHandler}>Load User</Button>
          </Box>
        </Box>
        {isLoading && <Text color='white' textAlign='center' padding='15px'>Fetching user...</Text>}
        <Text color='white' textAlign='center' padding='15px'>{userName.title}</Text>
        {userList.length ?
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
        </Box> : 
         <Alert status='info' marginTop='200px'>
         <AlertIcon />
          No user found.
       </Alert>
        }
      </Box>
    </Flex>
  );
};

export default UserList;
