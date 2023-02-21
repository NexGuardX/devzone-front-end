import { Center } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

function Profil() {
  const user = useSelector((state) => state.user);
  return <Center w="full" border="3px solid black" flexDirection="column" />;
}

export default Profil;
