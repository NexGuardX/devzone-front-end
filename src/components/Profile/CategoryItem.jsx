/* eslint-disable react/forbid-prop-types */
import { Heading, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { RiHtml5Line, RiNewspaperLine, RiSearchLine } from 'react-icons/ri';
import { SiJavascript } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAddToolToUser } from '../../features/user/userSlice';
import ToolSelector from './ToolSelector';

function CategoryItem({ category, userCategories }) {
  const dispatch = useDispatch();

  const userId = localStorage.getItem('userId');

  const isCategoriesUserLoaded = useSelector((state) => state.application.isCategoriesUserLoaded);

  const { name, description, tools, id } = category;
  const findUserCategory = userCategories.find((userCategory) => userCategory.id === id);

  // search if user have active tools
  function isCheck(tool) {
    if (typeof findUserCategory === 'undefined') {
      return false;
    }
    const findTool = findUserCategory.tools.find((userTool) => userTool.id === tool.id);
    if (!findTool) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (isCategoriesUserLoaded && userCategories.length === 0) {
      tools.map((tool) => {
        const toolId = tool.id;
        return dispatch(thunkAddToolToUser({ userId, toolId }));
      });
    }
  }, [userCategories, isCheck]);

  const toolsMap = {
    news: {
      icon: RiNewspaperLine,
    },
    search: {
      icon: RiSearchLine,
    },
    'playground-js': {
      icon: SiJavascript,
    },
    'playground-html': {
      icon: RiHtml5Line,
    },
  };

  return (
    <VStack
      justifyContent="space-between"
      p="0.5rem 2rem"
      marginX="1rem"
      borderBottom="1px solid #D72ED2"
      w={{ base: '100%', md: '60%' }}
    >
      <Heading fontSize="1.5rem" as="h3">
        {name}
      </Heading>
      <Text fontSize="0.8rem">{description}</Text>
      {tools.map((tool) =>
        tool ? (
          <ToolSelector
            icon={toolsMap[tool?.link?.toLocaleLowerCase().split('/').reverse()[0]]?.icon}
            key={tool.name}
            tool={tool}
            isCheck={isCheck(tool)}
          />
        ) : null
      )}
    </VStack>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    tools: PropTypes.array.isRequired,
  }).isRequired,
  userCategories: PropTypes.array,
};

CategoryItem.defaultProps = {
  userCategories: [{}],
};

export default CategoryItem;
