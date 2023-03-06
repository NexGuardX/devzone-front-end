import { Heading, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ToolSelector from './ToolSelector';

function CategoryItem({ category, userCategories }) {
  const { name, description, tools, id } = category;
  const findCategoryUser = userCategories.find((userCategory) => userCategory.id === id);

  return (
    <VStack
      justifyContent="space-between"
      p="0.5rem 2rem"
      marginX="1rem"
      borderBottom="1px solid #ddd"
      w={{ base: '100%', md: '60%' }}
    >
      <Heading fontSize="1.5rem" as="h3">
        {name}
      </Heading>
      <Text fontSize="0.8rem">{description}</Text>
      {tools.map((tool) =>
        tool ? <ToolSelector key={tool.name} tool={tool} userCategory={findCategoryUser} /> : null
      )}
    </VStack>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    tools: PropTypes.arrayOf([PropTypes.object]).isRequired,
  }).isRequired,
  userCategories: PropTypes.arrayOf([PropTypes.object]),
};

CategoryItem.defaultProps = {
  userCategories: [],
};

export default CategoryItem;
