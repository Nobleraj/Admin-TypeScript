import { Box, Heading, IconButton, Text } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { useAppDispatch } from '../hooks';
import { deleteUser } from '../redux/userSlice';
import { useHistory } from 'react-router-dom';
import { UserState } from '../types';

const UserInfo = ({
  firstName,
  lastName,
  address,
  city,
  country,
  id,
  ...rest
}: UserState) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const redirect = (id: string) => {
    history.push(`/update-user/${id}`);
  };

  return (
    <Box
      p={5}
      justifyContent="space-between"
      display="flex"
      shadow="md"
      borderWidth="1px"
      {...rest}
    >
      <Box display="flex" flexDirection="column">
        <Heading fontSize="xl">{firstName + " " + lastName}</Heading>
        <Text mt={4}>{address}</Text>
      </Box>
      <Box>
        <IconButton
          color="#1a202c"
          aria-label=""
          icon={<DeleteIcon />}
          marginRight="1rem"
          onClick={() => dispatch(deleteUser({ id }))}
        />
        <IconButton
          color="#1a202c"
          aria-label=""
          icon={<EditIcon />}
          onClick={() => redirect(id)}
        />
      </Box>
    </Box>
  );
};

export default UserInfo;
