import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { BsBoxArrowInRight } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo-dz.png';

export default function Intro() {
  return (
    <Flex
      as="section"
      aria-label="introduction"
      flexDirection={{ base: 'column', md: 'row-reverse' }}
      rowGap="2rem"
      justifyContent={{ base: 'center', md: 'space-around' }}
      alignItems="center"
      mb="2rem"
      minH="80dvh"
    >
      <Image maxWidth="350px" objectFit="cover" src={logo} alt="logo" />
      <Box textAlign={{ base: 'center', md: 'left' }}>
        <Heading as="h1">
          <Text fontSize="3rem">
            <Box display="inline" color="#d73d79">
              dev
            </Box>
            <Box display="inline" color="#56bac4">
              zone
            </Box>
          </Text>
        </Heading>
        <Heading as="h2">for Developers</Heading>
        <Heading as="h2">by&nbsp; Developers</Heading>
        <Box mt="1rem">
          <NavLink to="/app">
            <Button bg="gray.400" rightIcon={<BsBoxArrowInRight />}>
              Go To App
            </Button>
          </NavLink>
        </Box>
      </Box>
    </Flex>
  );
}
