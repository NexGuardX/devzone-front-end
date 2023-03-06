import { Box, Button, Center, Img, Text, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Delorean from '../../assets/images/DeLorean4.png';

function NotFoundPage() {
  return (
    <Center>
      <VStack>
        <Text color="gray" fontSize="200px">
          404
        </Text>
        <Box top="190" position="absolute">
          <Img src={Delorean} alt="Dolorean" />
          <Text color="gray" fontSize="1xl" textAlign="center">
            I GUESS YOU AREN&apos;T READY FOR THAT PAGE YET...{' '}
          </Text>
          <Text color="gray" fontSize="1xl" textAlign="center">
            BUT YOUR KIDS ARE GONNA LOVE IT.{' '}
          </Text>
          <Center>
            <NavLink to="/">
              <Button colorScheme="teal">GO BACK</Button>
            </NavLink>
          </Center>
        </Box>
      </VStack>
    </Center>
  );
}
export default NotFoundPage;
