import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ImStatsDots } from 'react-icons/im';
import { getGithubData } from '../../common/helpers/github';

export default function RepoStatsModal({ repo }) {
  const { owner: repoOwner, name: repoName } = repo;

  const path = `/repos/${repoOwner.login}/${repoName}/stats/commit_activity`;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getGithubData({ path }).then((res) => {
      console.log('⏩ ~ useEffect ~ res:', res);
    });
  }, []);

  return (
    <>
      <IconButton variant="ghost" icon={<ImStatsDots />} onClick={onOpen} />
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay opacity={0.5} />
        <ModalContent>
          <ModalHeader>{repo.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{repo.name}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

RepoStatsModal.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
  }).isRequired,
};
