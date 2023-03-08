/* eslint-disable camelcase */
import { Box, Button, Card, Flex, Heading, HStack, Tag, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { AiOutlineCheck, AiOutlineClose, AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function SOFCardResult({ result }) {
  const { tags, title, link, answer_count, is_answered } = result;

  return (
    <Card
      margin="auto"
      boxShadow="xl"
      width={{ base: '100%', md: '90%' }}
      border="1px solid lightgray"
      padding="0.5rem"
    >
      <Flex direction="row" justifyContent="space-between">
        <Link to={link} target="_blank">
          {/* <VStack padding="0.5rem" justifyContent="space-evenly">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png"
          alt="NPM"
          width="50px"
        />
      </VStack> */}
          <Box>
            <Heading size="md">{title}</Heading>

            <HStack>
              <Text> Is answered ? </Text>
              {is_answered ? <AiOutlineCheck color="green" /> : <AiOutlineClose color="red" />}
            </HStack>
            {tags.map((tag) => (
              <Tag key={tag} margin="0.3rem">
                {tag}
              </Tag>
            ))}
          </Box>
        </Link>
        <Button margin="0.5rem" width="1.5rem" padding="0.5rem">
          <AiOutlineStar size="1.3rem" />
        </Button>
      </Flex>
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
