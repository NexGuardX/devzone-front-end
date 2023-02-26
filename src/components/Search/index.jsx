import {
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { VscSearch } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModal, thunkSOFSearch } from '../../features/search/searchSlice';
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
    console.log(isModalOpen);
    if (isModalOpen) {
      onOpen();
      dispatch(setOpenModal(false));
    }
  }, [results, isModalOpen]);

  const makeSearch = (event) => {
    event.preventDefault();
    onClose();
    dispatch(setOpenModal(false));
    dispatch(thunkSOFSearch(searchValue));
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
