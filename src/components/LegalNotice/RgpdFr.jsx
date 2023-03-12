import { Box, Center, Text } from '@chakra-ui/react';

export default function RgpdFr() {
  return (
    <Center pt="25">
      <Box w="50%" borderWidth="1px" borderRadius="lg">
        <Text textAlign="center">
          Nous collectons vos données personnelles telles que votre nom, prénom et adresse e-mail
          pour vous permettre de vous identifier sur notre site. Nous ne les utilisons pas à des
          fins commerciales. Nous ne partagerons pas vos données personnelles avec des tiers sans
          votre consentement explicite. Nous prenons des mesures pour protéger vos données
          personnelles contre tout accès non autorisé, perte, vol ou dommage. Vous avez le droit
          d&apos;accéder à vos données personnelles, de les modifier ou de les supprimer à tout
          moment en nous contactant.
        </Text>
      </Box>
    </Center>
  );
}
