/* eslint-disable camelcase */
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { AiOutlineCheck, AiOutlineClose, AiOutlineStar } from 'react-icons/ai';
import { FaStackOverflow } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SOFCardResult({ result }) {
  const { tags, title, link, answer_count, is_answered } = result;

  return (
    <Card width="350px" margin="auto" height="500px">
      <HStack padding="0.5rem" justifyContent="space-evenly">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png"
          alt="NPM"
          width="50px"
        />
        <Text fontSize="1rem">Stack Overflow</Text>
        <Button>
          <AiOutlineStar />
        </Button>
      </HStack>
      <Divider />

      <CardBody>
        <Stack>
          <Text fontSize="1.3rem">{title}</Text>
          <Text fontSize="1rem">{answer_count} answers</Text>
          <HStack>
            <Text> Is answered ? </Text>
            {is_answered ? <AiOutlineCheck /> : <AiOutlineClose />}
          </HStack>
        </Stack>
        <Box>
          {tags.map((tag) => (
            <Tag key={tag} margin="0.3rem">
              {tag}
            </Tag>
          ))}
        </Box>
      </CardBody>

      <Divider />
      <Stack textAlign="center">
        <Link to={link} target="_blank">
          <Button margin="0.5rem" padding="0.5rem">
            <FaStackOverflow size="1.5rem" /> Read answers on Stack Overflow
          </Button>
        </Link>
      </Stack>
    </Card>
  );
}

SOFCardResult.propTypes = {
  result: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.string.isRequired,
    answer_count: PropTypes.number.isRequired,
    is_answered: PropTypes.bool.isRequired,
  }).isRequired,
};

export default SOFCardResult;
