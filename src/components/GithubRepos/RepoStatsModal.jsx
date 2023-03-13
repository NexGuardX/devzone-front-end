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
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ImStatsDots } from 'react-icons/im';
import { apiGithub } from '../../common/helpers/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function RepoStatsModal({ repo }) {
  const [repoStats, setRepoStats] = useState([]);

  const { owner: repoOwner, name: repoName } = repo;
  const path = `/repos/${repoOwner.login}/${repoName}/stats/commit_activity`;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    apiGithub.get(path).then((res) => {
      if (res.data.length) {
        setRepoStats(res.data);
      }
    });
  }, []);

  // Creating weekly commits array from repo statistics
  const weeklyCommits = !repoStats.length
    ? []
    : repoStats.reduce((acc, stat) => {
        acc.push(stat.total);
        return acc;
      }, []);

  // CHART DATA
  const labels = weeklyCommits.map(() => '');
  const datasets = [
    {
      label: 'Commits',
      data: weeklyCommits,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderWidth: 1,
    },
  ];

  const chartData = {
    labels,
    datasets,
  };

  return (
    <>
      <IconButton variant="ghost" icon={<ImStatsDots />} onClick={onOpen} />
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay opacity={0.5} />
        <ModalContent>
          <ModalHeader>{repo.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Weekly Commits
            <Line data={chartData} />
          </ModalBody>
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
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
