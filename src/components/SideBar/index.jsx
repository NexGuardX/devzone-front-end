import { Box, Flex, VStack } from '@chakra-ui/react';
import { BsStar } from 'react-icons/bs';
import {
  RiHomeSmileLine,
  RiHtml5Line,
  RiMailSendLine,
  RiNewspaperLine,
  RiSearchLine,
} from 'react-icons/ri';
import { SiJavascript } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModal } from '../../features/search/searchSlice';
import SideBarItem from './SideBarItem';
import SideBarTitle from './SideBarTitle';

function SideBar() {
  const username = useSelector((state) => state.user.username);
  const categoriesAndTools = useSelector((state) => state.application.sidebarCategoriesAndTools);
  const dispatch = useDispatch();

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
      display={{ base: 'none', md: 'flex' }}
      flexDirection="column"
      justifyContent="space-between"
      px="1rem"
      py="2rem"
      borderRight="1px solid gray"
    >
      {/* Upper sidebar menu */}
      <VStack align="left">
        {username ? <SideBarItem icon={BsStar} text="Bookmarks" to="/app/bookmarks" /> : null}
        {categoriesAndTools.map((category) => (
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
