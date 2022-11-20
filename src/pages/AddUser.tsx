import {
    Box,
    Button,
    FormLabel,
    Heading,
    Input,
    useToast,
    SimpleGrid,
    GridItem,
    VStack,
    Select,
    FormControl
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
    const [country, setCountry] = useState<string | undefined>(user?.country || "");
  
    const toast = useToast();

    const handleOnSubmit = () => {
      if (id) {
        editBook();
        return;
      }
      //if(!title || !author)return;
      dispatch(addNewUser({ firstName, lastName, address, city, country, id: uuidv4() }));
      toast({
        title: 'User created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      clearInputs();
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
      setCountry("ind");
    };
  
    return (
      /*<Flex
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
            <Heading color="white" data-testid="header">
              {id ? "Update User" : "Add User"}
            </Heading>
          </Box>
          <FormLabel color="white">Title</FormLabel>
          <Input
            value={title}
            color="white"
            placeholder="The Lord of the Rings"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <FormLabel color="white" marginTop={4}>
            Author
          </FormLabel>
          <Input
            value={author}
            color="white"
            placeholder="J.R.R Tolkien"
            onChange={(e) => setAuthor(e.currentTarget.value)}
          />
          <Button
            marginTop={4}
            colorScheme="teal"
            type="submit"
            onClick={handleOnSubmit}
          >
            Submit
          </Button>
        </Box>
      </Flex>*/
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
            <Input color='white' placeholder="John" value={firstName} onChange={(e)=>setFirstname(e.target.value)}/>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel color='white'>Last Name</FormLabel>
            <Input color='white' placeholder="Doe" value={lastName} onChange={(e)=>setLastname(e.target.value)}/>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel color='white'>Address</FormLabel>
            <Input color='white' placeholder="Blvd. Broken Dreams 21" value={address} onChange={(e)=>setAddress(e.target.value)}/>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel color='white'>City</FormLabel>
            <Input color='white' placeholder="San Francisco" value={city} onChange={(e)=>setCity(e.target.value)}/>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel color='white'>Country</FormLabel>
            <Select color='white' defaultValue={country} onChange={(e)=>setCountry(e.target.value)}>
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
              <option value="germany">Germany</option>
            </Select>
          </FormControl>
        </GridItem>
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