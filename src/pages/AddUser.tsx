import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  GridItem,
  VStack,
  Select,
  FormControl,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addNewUser, updateUser } from "../redux/userSlice";
import { v4 as uuidv4 } from "uuid";
import { useParams, useHistory } from "react-router-dom";

const AddUser = () => {
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) =>
    state.user.userList.find((user) => user.id === id)
  );

  const [firstName, setFirstname] = useState<string | undefined>(user?.firstName || "");
  const [lastName, setLastname] = useState<string | undefined>(user?.lastName || "");
  const [address, setAddress] = useState<string | undefined>(user?.address || "");
  const [city, setCity] = useState<string | undefined>(user?.city || "");
  const [country, setCountry] = useState<string | undefined>(user?.country || "default");
  const [isError, setIsError] = useState<boolean>(false);
  const [isFormSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleOnSubmit = () => {
    if (id) {
      editBook();
      return;
    }
    if (!firstName || !lastName || !address || !city || country === 'default') {
      setIsError(!isError);
      setTimeout(() => setIsError(false), 3000);
      return;
    };
    dispatch(addNewUser({ firstName, lastName, address, city, country, id: uuidv4() }));
    
    clearInputs();
    setFormSubmitted(!isFormSubmitted);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const editBook = () => {
    if (id) {
      dispatch(updateUser({ id, firstName, lastName, address, city, country }));
      clearInputs();
      history.push("/");
    }
  };

  const clearInputs = () => {
    setFirstname("");
    setLastname("");
    setAddress("");
    setCity("");
    setCountry("default");
  };
  return (
    <VStack w="full" h="full" p={10} spacing={10}
      justifyContent="center"
      alignItems="center">
      <Box width='45%' marginTop='60px'>
        <Heading color="white" data-testid="header">
          {id ? "Update User" : "Add User"}
        </Heading>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full" marginTop='25px'>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel color='white'>First Name</FormLabel>
              <Input color='white' placeholder="John" value={firstName} onChange={(e) => setFirstname(e.target.value)} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel color='white'>Last Name</FormLabel>
              <Input color='white' placeholder="Doe" value={lastName} onChange={(e) => setLastname(e.target.value)} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel color='white'>Address</FormLabel>
              <Input color='white' placeholder="Blvd. Broken Dreams 21" value={address} onChange={(e) => setAddress(e.target.value)} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel color='white'>City</FormLabel>
              <Input color='white' placeholder="San Francisco" value={city} onChange={(e) => setCity(e.target.value)} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel color='white'>Country</FormLabel>
              <Select data-testid='select' color='white' value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="default">Select Country</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
                <option value="germany">Germany</option>
              </Select>
            </FormControl>
          </GridItem>
          {isError && <GridItem colSpan={2}>
            <Alert status='error'>
              <AlertIcon />
              All fields are mandatory.
            </Alert>
            </GridItem>
          }
          {isFormSubmitted && <GridItem colSpan={2}>
            <Alert status='success'>
              <AlertIcon />
              User created successfully.
            </Alert>
            </GridItem>
          }
          <GridItem colSpan={2}>
            <Button size="lg" w="full" colorScheme='teal' marginTop='10px' onClick={handleOnSubmit}>
              Submit
            </Button>
          </GridItem>
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default AddUser;
