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
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { RxClipboardCopy } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import {
  setDescription,
  setEmail,
  setFirstname,
  setLastname,
  setWebsite,
} from '../../../features/user/userSlice';
import Description from './Description';
import './style.scss';

function UserInformations({ user }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const [form, setForm] = useState('');

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setFirstname(event.target[0].value));
    dispatch(setLastname(event.target[1].value));
    dispatch(setWebsite(event.target[2].value));
    dispatch(setEmail(event.target[3].value));
    dispatch(setDescription(event.target[4].value));
    onClose();
    console.log(event);
  };

  return (
    <Box margin="1rem" w={{ base: '100%', md: '300px', lg: '400px' }}>
      <Heading as="h1" margin="1.5rem">
        PROFILE
      </Heading>

      <Img
        margin="auto"
        w="50%"
        maxW="300px"
        rounded="full"
        border="3px solid black"
        src={user.avatar}
      />
      <Heading marginTop="0.5rem" as="h2">
        {user.username}
        <Button marginLeft="0.3rem" p="0">
          <RxClipboardCopy size="1.3rem" />
        </Button>
      </Heading>
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
                <FormLabel className="modal-form-label" htmlFor="firstname">
                  First name
                  <Input
                    id="firstname"
                    onChange={handleChange}
                    ref={initialRef}
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

              <FormControl isRequired>
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
                <FormLabel className="modal-form-label" htmlFor="description">
                  Description
                  <Input
                    id="description"
                    onChange={handleChange}
                    type="textarea"
                    name="description"
                    defaultValue={user.description}
                    placeholder="Love coding..."
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
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
export default UserInformations;
