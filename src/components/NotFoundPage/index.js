import { Button, Center, Img, Text, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Delorean from '../../assets/images/DeLorean4.png';

function NotFoundPage() {
  return (
    <Center>
      <VStack>
        <Text color="gray" fontSize="9xl">
          404
        </Text>
        <Img src={Delorean} alt="Dolorean" />
        <Text color="gray" fontSize="2xl" textAlign="center">
          I GUESS YOU AREN&apos;T READY FOR THAT PAGE YET...{' '}
        </Text>
        <Text color="gray" fontSize="2xl" textAlign="center">
          BUT YOUR KIDS ARE GONNA LOVE IT.{' '}
        </Text>
        <NavLink to="/">
          <Button colorScheme="teal">GO BACK</Button>
        </NavLink>
      </VStack>
    </Center>
  );
}
export default NotFoundPage;
