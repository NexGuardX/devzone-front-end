import { Flex, VStack } from '@chakra-ui/react';
import {
  RiHomeSmileLine,
  RiHtml5Line,
  RiMailSendLine,
  RiNewspaperLine,
  RiSearchLine,
} from 'react-icons/ri';
import { SiJavascript } from 'react-icons/si';
import SideBarItem from './SideBarItem';
import SideBarTitle from './SideBarTitle';

function SideBar() {
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
        <SideBarItem icon={RiNewspaperLine} text="News" to="/app/news" />
        <SideBarItem icon={RiSearchLine} text="Search" to="/app/search" />
        <SideBarTitle text="Playground" />
        <SideBarItem icon={SiJavascript} text="Javascript" to="/app/playground-js" />
        <SideBarItem icon={RiHtml5Line} text="HTML" to="/app/playground-html" />
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
