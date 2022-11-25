import { Button, Flex, Box} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      as="nav"
      p={4}
      mx="auto"
      maxWidth="1150px"
    >
      <Box>
        <Link to="/">
          <Button
            fontWeight={['medium', 'medium', 'medium']}
            fontSize={['xs', 'sm', 'lg', 'xl']}
            variant="ghost"
            _hover={{ bg: 'rgba(0,0,0,.2)' }}
            padding="1"
            color="white"
            letterSpacing="0.65px"
          >
            Admin App
          </Button>
        </Link>
      </Box>

      <Box>
        <Link to="/">
          <Button
            fontWeight={['medium', 'medium', 'medium']}
            fontSize={['xs', 'sm', 'lg', 'xl']}
            variant="ghost"
            _hover={{ bg: 'rgba(0,0,0,.2)' }}
            p={[1, 4]}
            color="white"
          >
            User List
          </Button>
        </Link>
        <Link to="/add-new-user">
          <Button
            fontWeight={['medium', 'medium', 'medium']}
            fontSize={['xs', 'sm', 'lg', 'xl']}
            variant="ghost"
            _hover={{ bg: 'rgba(0,0,0,.2)' }}
            p={[1, 4]}
            color="white"
          >
            Add User
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
