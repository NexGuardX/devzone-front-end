import { Flex, VStack } from '@chakra-ui/react';
import {
  RiHomeSmileLine,
  RiHtml5Line,
  RiMailSendLine,
  RiNewspaperLine,
  RiSearchLine,
} from 'react-icons/ri';
import { SiJavascript } from 'react-icons/si';
import { useDispatch } from 'react-redux';
import { categories } from '../../common/data/categories';
import { setOpenModal } from '../../features/search/searchSlice';
import SideBarItem from './SideBarItem';
import SideBarTitle from './SideBarTitle';

function SideBar() {
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
      ps="1rem"
      pe={{ base: '1rem', lg: '3rem' }}
      py="2rem"
      borderRight="1px solid gray"
    >
      {/* Upper sidebar menu */}
      <VStack align="left">
        {categories.map((category) => (
          <>
            <SideBarTitle text={category.name} />
            {category.tools.map((tool) => (
              <SideBarItem
                icon={toolsMap[tool.link.toLocaleLowerCase().split('/').reverse()[0]]?.icon}
                text={tool.name}
                to={tool.link}
                toolId={tool.id}
                openSearchModal={
                  toolsMap[tool.link.toLocaleLowerCase().split('/').reverse()[0]]?.openSearchModal
                }
              />
            ))}
          </>
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
