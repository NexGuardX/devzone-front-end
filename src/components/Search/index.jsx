import {
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { VscSearch } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOpenModal, setSearch, setSearchTools,
  thunkNPMSearch, thunkSOFSearch
} from '../../features/search/searchSlice';
import Results from './Results';

function Search() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.results);
  const isModalOpen = useSelector((state) => state.search.isOpen);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchValue, setSearchValue] = useState('');

  const handleChangeInput = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (isModalOpen) {
      onOpen();
      dispatch(setOpenModal(false));
    }
  }, [results, isModalOpen]);

  const makeSearch = (event) => {
    event.preventDefault();
    onClose();
    dispatch(setOpenModal(false));
    dispatch(setSearch(searchValue));
    if (searchTools === 'SOF') {
      dispatch(thunkSOFSearch(searchValue));
    } else if (searchTools === 'NPM') {
      dispatch(thunkNPMSearch(searchValue));
    }
  };

  return (
    <Flex height="calc(100vh -70px)" flexDirection="column">
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent maxW="70%">
          <form onSubmit={makeSearch}>
            <FormControl>
              <Input
                fontSize="2.5rem"
                padding="2rem"
                type="text"
                variant="unstyled"
                onChange={handleChangeInput}
              />
            </FormControl>
            <Button type="submit" fontSize="1.5rem">
              <VscSearch padding="0.3rem" /> Stack Overflow
            </Button>
          </form>
        </ModalContent>
      </Modal>

      <Results />
    </Flex>
  );
}

export default Search;

function Search() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.results);
  const isModalOpen = useSelector((state) => state.search.isOpen);
  const searchTools = useSelector((state) => state.search.searchTools);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchValue, setSearchValue] = useState('');

  const handleChangeInput = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (isModalOpen) {
      onOpen();
      dispatch(setOpenModal(false));
    }
  }, [results, isModalOpen]);

  const handleClick = (event) => {
    dispatch(setSearchTools(event.target.value));
  };
  const makeSearch = (event) => {
    event.preventDefault();
    onClose();
    dispatch(setOpenModal(false));
    dispatch(setSearch(searchValue));

  };

  return (
    <Flex height="calc(100vh -70px)" flexDirection="column">
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent maxW="70%">
          <form onSubmit={makeSearch}>
            <FormControl>
              <Input
                fontSize="2.5rem"
                padding="2rem"
                type="text"
                variant="unstyled"
                onChange={handleChangeInput}
              />
            </FormControl>
            <Button onClick={handleClick} type="submit" fontSize="1.5rem" value="SOF">
              <VscSearch padding="0.3rem" /> Stack Overflow
            </Button>
            <Button onClick={handleClick} type="submit" fontSize="1.5rem" value="NPM">
              <VscSearch padding="0.3rem" /> NPM
            </Button>
          </form>
        </ModalContent>
      </Modal>

      <Results />
    </Flex>
  );
}

export default Search;

function Search() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.results);
  const isModalOpen = useSelector((state) => state.search.isOpen);
  const searchTools = useSelector((state) => state.search.searchTools);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchValue, setSearchValue] = useState('');

  const handleChangeInput = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    console.log(isModalOpen);
    if (isModalOpen) {
      onOpen();
      dispatch(setOpenModal(false));
    }
  }, [results, isModalOpen]);

  const handleClick = (event) => {
    dispatch(setSearchTools(event.target.value));
  };
  const makeSearch = (event) => {
    event.preventDefault();
    onClose();
    dispatch(setOpenModal(false));
    if (searchTools === 'SOF') {
      dispatch(thunkSOFSearch(searchValue));
    } else if (searchTools === 'NPM') {
      dispatch(thunkNPMSearch(searchValue));
    }
  };

  return (
    <Flex height="calc(100vh -70px)" flexDirection="column">
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent maxW="70%">
          <form onSubmit={makeSearch}>
            <FormControl>
              <Input fontSize="2rem" padding="3rem" type="text" onChange={handleChangeInput} />
            </FormControl>
            <Button onClick={handleClick} type="submit" fontSize="1.5rem" value="SOF">
              <VscSearch padding="0.3rem" /> Stack Overflow
            </Button>
            <Button onClick={handleClick} type="submit" fontSize="1.5rem" value="NPM">
              <VscSearch padding="0.3rem" /> NPM
            </Button>
          </form>
        </ModalContent>
      </Modal>

      <Results />
    </Flex>
  );
}

export default Search;
