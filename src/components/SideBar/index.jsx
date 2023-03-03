import { Flex, VStack } from '@chakra-ui/react';
import { Fragment, useEffect } from 'react';
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
import { thunkFetchSidebarCategoriesAndTools } from '../../features/user/userSlice';
import SideBarItem from './SideBarItem';
import SideBarTitle from './SideBarTitle';

const { REACT_APP_API_URL } = process.env;

function SideBar() {
  const username = useSelector((state) => state.user.username);
  const categoriesAndTools = useSelector((state) => state.user.sidebarCategoriesAndTools);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkFetchSidebarCategoriesAndTools());
  }, [username]);

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
        {username ? <SideBarItem icon={BsStar} text="Bookmarks" to="/app/bookmarks" /> : null}
        {categoriesAndTools.map((category) => (
          <Fragment key={category.name}>
            <SideBarTitle text={category.name} />
            {category.tools.map((tool) => (
              <SideBarItem
                key={tool.id}
                icon={toolsMap[tool.link.toLocaleLowerCase().split('/').reverse()[0]]?.icon}
                text={tool.name}
                to={tool.link}
                toolId={tool.id}
                openSearchModal={
                  toolsMap[tool.link.toLocaleLowerCase().split('/').reverse()[0]]?.openSearchModal
                }
              />
            ))}
          </Fragment>
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
