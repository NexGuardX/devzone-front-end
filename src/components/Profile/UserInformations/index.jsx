import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import defaultProfilePicture from '../../../assets/images/4500_3_04.jpg';
import {
  setEmail,
  setFirstname,
  setLastname,
  setUsername,
  setWebsite,
  thunkUpdateProfil,
} from '../../../features/user/userSlice';
import Description from './Description';

function UserInformations({ user }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const userId = localStorage.getItem('userId');

  const [form, setForm] = useState('');

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // TODO: Factoriser le handleSubmit et le userSlice
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(thunkUpdateProfil(form, userId));
    dispatch(setUsername(event.target[1].value));
    dispatch(setFirstname(event.target[2].value));
    dispatch(setLastname(event.target[3].value));
    dispatch(setWebsite(event.target[4].value));
    dispatch(setEmail(event.target[5].value));
    onClose();
  };

  return (
    <Box
      margin="1rem auto"
      marginLeft="1rem"
      minH={{ base: 'auto', md: '70vh' }}
      w={{ base: '90%', md: '300px', lg: '400px' }}
      p={{ base: 'none', lg: '1.5rem' }}
      paddingTop="0"
      paddingBottom="1rem"
      border="1px solid #ddd"
      borderRadius="15px"
    >
      <Heading as="h1" margin="1.5rem" marginTop="0">
        PROFILE
      </Heading>

      <Img
        margin="auto"
        w="50%"
        maxW="300px"
        rounded="full"
        border="3px solid black"
        src={user.avatar ? user.avatar : defaultProfilePicture}
      />
      <Stack marginTop="0.5rem">
        <Text>Pseudo</Text>
        <Heading as="h2">{user.username}</Heading>
      </Stack>

      <Description user={user} />

      <Button onClick={onOpen}>
        Edit Profile <AiOutlineEdit size="1.3rem" />
      </Button>

      {/* EditModal */}
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit} className="modal-form">
              <FormControl>
                <Input type="hidden" name="id" value={user.id} />
              </FormControl>

              <FormControl>
                <FormLabel className="modal-form-label" htmlFor="username">
                  Username
                  <Input
                    id="username"
                    onChange={handleChange}
                    ref={initialRef}
                    type="text"
                    name="username"
                    defaultValue={user.username}
                    placeholder="Username"
                  />
                </FormLabel>
              </FormControl>

              <FormControl>
                <FormLabel className="modal-form-label" htmlFor="firstname">
                  First name
                  <Input
                    id="firstname"
                    onChange={handleChange}
                    type="text"
                    name="firstname"
                    defaultValue={user.firstname}
                    placeholder="First name"
                  />
                </FormLabel>
              </FormControl>

              <FormControl>
                <FormLabel className="modal-form-label" htmlFor="lastname">
                  Last name
                  <Input
                    id="lastname"
                    onChange={handleChange}
                    type="text"
                    name="lastname"
                    defaultValue={user.lastname}
                    placeholder="Last name"
                  />
                </FormLabel>
              </FormControl>

              <FormControl>
                <FormLabel className="modal-form-label" htmlFor="website">
                  Website
                  <Input
                    id="website"
                    onChange={handleChange}
                    type="text"
                    name="website"
                    defaultValue={user.website}
                    placeholder="Website"
                  />
                </FormLabel>
              </FormControl>

              <FormControl>
                <FormLabel className="modal-form-label" htmlFor="email">
                  Email
                  <Input
                    id="email"
                    onChange={handleChange}
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    placeholder="Email"
                  />
                </FormLabel>
              </FormControl>

              <FormControl>
                <FormLabel className="modal-form-label" htmlFor="website">
                  Password
                  <Input
                    id="password"
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </FormLabel>
              </FormControl>

              <Button type="submit">Save</Button>
              <Button type="button" onClick={onClose}>
                Cancel
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
UserInformations.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
};
export default UserInformations;
