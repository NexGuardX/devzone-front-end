import { Container, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

function Profil() {
  const user = useSelector((state) => state.user);
  return (
    <Container>
      <Image src={user.avatar} alt={user.username} />
    </Container>
  );
}

export default Profil;
