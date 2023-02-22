import {
  Box,
  Button,
  Heading,
  Img,
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
import { setUserInformations } from '../../../features/user/userSlice';
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
  console.log(form);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setUserInformations({ ...form }));
    // dispatch(setFirstname(event.target[0].value));
    // dispatch(setLastname(event.target[1].value));
    // dispatch(setWebsite(event.target[2].value));
    // dispatch(setEmail(event.target[3].value));
    // dispatch(setDescription(event.target[4].value));
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

      {/* EditModal */}
      <Button onClick={onOpen}>
        Edit Profile <AiOutlineEdit size="1.3rem" />
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your profil</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit} className="modal-form">
              <label className="modal-form-label" htmlFor="firstname">
                First name
                <input
                  id="firstname"
                  onChange={handleChange}
                  ref={initialRef}
                  type="text"
                  name="firstname"
                  defaultValue={user.firstname}
                  placeholder="First name"
                />
              </label>

              <label className="modal-form-label" htmlFor="lastname">
                Last name
                <input
                  id="lastname"
                  onChange={handleChange}
                  type="text"
                  name="lastname"
                  defaultValue={user.lastname}
                  placeholder="Last name"
                />
              </label>

              <label className="modal-form-label" htmlFor="website">
                Website
                <input
                  id="website"
                  onChange={handleChange}
                  type="text"
                  name="website"
                  defaultValue={user.website}
                  placeholder="Website"
                />
              </label>

              <label className="modal-form-label" htmlFor="email">
                Email
                <input
                  id="email"
                  onChange={handleChange}
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  placeholder="Email"
                />
              </label>

              <label className="modal-form-label" htmlFor="description">
                Description
                <input
                  id="description"
                  onChange={handleChange}
                  type="textarea"
                  name="description"
                  defaultValue={user.description}
                  placeholder="Love coding..."
                />
              </label>

              <button type="submit" onClick={onClose}>
                Save
              </button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
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
