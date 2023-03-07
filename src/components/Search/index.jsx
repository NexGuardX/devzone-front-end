import {
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaGithub, FaNpm, FaStackOverflow } from 'react-icons/fa';
import { VscSearch } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';

import {
  setIsLoaded,
  setOpenModal,
  setResults,
  setSearch,
  setSearchTools,
  thunkGHSearch,
  thunkNPMSearch,
  thunkSOFSearch,
} from '../../features/search/searchSlice';
import Results from './Results';

function Search() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.search.isOpen);
  const searchTools = useSelector((state) => state.search.searchTools);
  const isLoaded = useSelector((state) => state.search.isLoaded);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchValue, setSearchValue] = useState('');

  // Set input value
  const handleChangeInput = (event) => {
    setSearchValue(event.target.value);
  };

  // dispatch call to the good API
  const makeSearch = (event) => {
    event.preventDefault();
    dispatch(setSearch(searchValue));
    dispatch(setIsLoaded(false));
    onClose();
    dispatch(setOpenModal(false));
    if (searchTools === 'Stack OverFlow') {
      dispatch(thunkSOFSearch(searchValue));
    }
    if (searchTools === 'NPM') {
      dispatch(thunkNPMSearch(searchValue));
    }
    if (searchTools === 'GitHub') {
      dispatch(thunkGHSearch(searchValue));
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      onOpen();
      dispatch(setOpenModal(false));
    }
  }, [isModalOpen, searchTools]);

  // reinitialize results & set which tool is used
  const handleClick = (event) => {
    dispatch(setResults([]));
    dispatch(setSearchTools(event.target.value));
  };

  return (
    <Flex height="calc(100vh -70px)" flexDirection="column">
      <form onSubmit={makeSearch}>
        <FormControl display={{ base: 'block', md: 'none' }}>
          <InputGroup>
            <Input
              fontSize="1.3rem"
              padding="1.5rem"
              type="text"
              onChange={handleChangeInput}
              defaultValue={searchValue}
            />
            <InputLeftElement pointerEvents="none">
              <VscSearch size="1.3rem" padding="0.8rem" />
            </InputLeftElement>
          </InputGroup>
        </FormControl>
        <Flex width="100%" display={{ base: 'flex', md: 'none' }}>
          <Button
            onClick={handleClick}
            type="submit"
            fontSize="2rem"
            width="100%"
            value="Stack OverFlow"
          >
            <FaStackOverflow />
          </Button>
          <Button onClick={handleClick} type="submit" fontSize="2rem" width="100%" value="NPM">
            <FaNpm />
          </Button>
          <Button onClick={handleClick} type="submit" fontSize="2rem" width="100%" value="GitHub">
            <FaGithub />
          </Button>
        </Flex>
      </form>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent maxW="70%">
          <form onSubmit={makeSearch}>
            <FormControl>
              <InputGroup>
                <Input
                  fontSize="2rem"
                  padding="3rem"
                  type="text"
                  onChange={handleChangeInput}
                  defaultValue={searchValue}
                />
                <InputLeftElement pointerEvents="none" marginTop="2rem" marginLeft="0.3rem">
                  <VscSearch size="2.3rem" />
                </InputLeftElement>
              </InputGroup>
            </FormControl>
            <Flex width="100%">
              <Button
                onClick={handleClick}
                type="submit"
                fontSize="1.5rem"
                width="100%"
                value="Stack OverFlow"
              >
                <FaStackOverflow padding="0.3rem" /> Stack Overflow
              </Button>

              <Button
                onClick={handleClick}
                type="submit"
                fontSize="1.5rem"
                width="100%"
                value="NPM"
              >
                <FaNpm padding="0.3rem" /> NPM
              </Button>
              <Button
                onClick={handleClick}
                type="submit"
                fontSize="1.5rem"
                width="100%"
                value="GitHub"
              >
                <FaGithub /> GitHub
              </Button>
            </Flex>
          </form>
        </ModalContent>
      </Modal>
      {isLoaded ? <Results /> : null}
    </Flex>
  );
}

export default Search;
