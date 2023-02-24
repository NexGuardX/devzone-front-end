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
import { thunkSOFSearch } from '../../features/tools/toolsSlice';
import Results from './Results';

function Search() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.tools.results);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchValue, setSearchValue] = useState('');

  const handleChangeInput = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };
  console.log(searchValue);
  useEffect(() => {}, [results]);

  const makeSearch = (event) => {
    event.preventDefault();
    onClose();
    dispatch(thunkSOFSearch(searchValue));
  };

  const handleSearchModal = () => {
    onOpen();
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
      {results.length === 0 ? (
        <Button
          padding="3rem"
          margin="auto"
          marginTop="calc((100vh - 70px) / 2)"
          fontSize="5rem"
          onClick={handleSearchModal}
        >
          Make search
        </Button>
      ) : (
        <>
          <Button margin="auto" fontSize="2rem" onClick={handleSearchModal}>
            New Search ?
          </Button>
          <Results />
        </>
      )}
    </Flex>
  );
}

export default Search;
