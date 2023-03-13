import { Box, Flex, VStack } from '@chakra-ui/react';
import { BsStar } from 'react-icons/bs';
import { GoRepo } from 'react-icons/go';
import {
  RiHomeSmileLine,
  RiHtml5Line,
  RiMailSendLine,
  RiNewspaperLine,
  RiSearchLine,
} from 'react-icons/ri';
import { SiJavascript } from 'react-icons/si';
import { SlOrganization } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModal } from '../../features/search/searchSlice';
import SideBarItem from './SideBarItem';
import SideBarTitle from './SideBarTitle';

function SideBar() {
  const username = useSelector((state) => state.user.username);
  const githubUsername = useSelector((state) => state.user.githubUsername);
  const categoriesAndTools = useSelector((state) => state.application.sidebarCategoriesAndTools);
  const dispatch = useDispatch();

  // Sort By order
  const categoriesAndToolsToDisplay = [...categoriesAndTools];
  categoriesAndToolsToDisplay.sort((a, b) => a.category_order - b.category_order);

  const handleSearchModal = () => {
    dispatch(setOpenModal(true));
  };

  const toolsMap = {
    news: {
      icon: RiNewspaperLine,
    },
    search: {
      icon: RiSearchLine,
      openSearchModal: handleSearchModal,
    },
    'playground-js': {
      icon: SiJavascript,
    },
    'playground-html': {
      icon: RiHtml5Line,
    },
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      px="1rem"
      py="2rem"
      borderRight={{ base: 'none', md: '1px solid gray' }}
    >
      {/* Upper sidebar menu */}
      <VStack align="left">
        {username ? <SideBarItem icon={BsStar} text="Bookmarks" to="/app/bookmarks" /> : null}
        {categoriesAndToolsToDisplay.map((category) => (
          <Box key={category.name} mb="1rem">
            <SideBarTitle text={category.name} />
            {!category.tools.length || !category.tools[0]
              ? null
              : category.tools.map((tool) => (
                  <SideBarItem
                    key={tool?.id}
                    icon={toolsMap[tool?.link?.toLocaleLowerCase().split('/').reverse()[0]]?.icon}
                    text={tool?.name}
                    to={tool?.link}
                    openSearchModal={
                      toolsMap[tool?.link?.toLocaleLowerCase().split('/').reverse()[0]]
                        ?.openSearchModal
                    }
                  />
                ))}
          </Box>
        ))}
        {!githubUsername ? null : (
          <>
            <SideBarTitle text="Github" />
            <SideBarItem icon={GoRepo} text="Repositories" to="/app/github-repos" />
            <SideBarItem icon={SlOrganization} text="Organizations" to="/app/github-orgs" />
          </>
        )}
      </VStack>
      {/* Bottom sidebar menu */}
      <VStack align="left">
        <SideBarItem icon={RiHomeSmileLine} text="Home" to="/" />
        <SideBarItem icon={RiMailSendLine} text="Contact" to="/contact" />
      </VStack>
    </Flex>
  );
}

export default SideBar;
