import { Button, Card, CardBody, Tag, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardResult({ result }) {
  const { tags, title, link } = result;
  return (
    <Card>
      <CardBody>
        <Text>{title}</Text>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        <Button>
          <Link to={link} target="_blank">
            Go
          </Link>
        </Button>
      </CardBody>
    </Card>
  );
}

CardResult.propTypes = {
  result: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardResult;
