import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { RiMailSendLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Reaptcha from 'reaptcha';
import { thunkContactForm } from '../../features/application/applicationSlice';

const { REACT_APP_RECAPTCHA_V2_KEY } = process.env;
const initContactForm = () => ({
  email: '',
  subject: '',
  message: '',
  type: '',
});

export default function Contact() {
  const [form, setForm] = useState(initContactForm);
  const [captcha, setCaptcha] = useState(0);
  const formRef = useRef();
  const focusRef = useRef();
  const captchaRef = useRef();
  const toast = useToast();

  const dispatch = useDispatch();
  // Focus on first form input at first render of component
  useEffect(() => {
    focusRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captcha) {
      return toast({
        title: 'Are you human ?',
        description: 'Please Validate Captcha',
        status: 'warning',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    }

    // Reset Form
    setForm(initContactForm());

    // Reset Captcha
    captchaRef.current.reset();
    dispatch(thunkContactForm(form));

    return null;
  };

  const handleCaptcha = (value) => {
    setCaptcha(value);
  };
  return (
    <Flex justify="center" alignItems="center" p="2rem 1rem" minH="80vh" flexDirection="column">
      <Box p="2rem" border="1px solid gray" borderRadius={10} w="90%" maxW="800px">
        <form method="POST" ref={formRef} onSubmit={handleSubmit}>
          <VStack>
            <Heading as="h1">Contact us</Heading>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                ref={focusRef}
                type="email"
                name="email"
                value={form?.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel position="left">Type</FormLabel>
              <Select name="type" placeholder="Select option" onChange={handleChange}>
                <option value={form?.issue}>Report an issue</option>
                <option value={form?.other}>Other</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Subject</FormLabel>
              <Input type="text" name="subject" value={form?.subject} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                placeholder="Your message"
                name="message"
                value={form?.message}
                onChange={handleChange}
              />
            </FormControl>
            <Reaptcha
              sitekey={REACT_APP_RECAPTCHA_V2_KEY}
              ref={captchaRef}
              onVerify={handleCaptcha}
              onLoad={() => setCaptcha(null)}
            />
            {captcha === 0 && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )}
            <Button rightIcon={<Icon as={RiMailSendLine} />} type="submit">
              Send
            </Button>
          </VStack>
        </form>
      </Box>
      <Box w="100%">
        <Container
          as={Stack}
          maxW="6xl"
          py={4}
          spacing={4}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>
            © 2023 DevZone. All rights reserved. <NavLink to="/legal-notice">Legal notice</NavLink>{' '}
          </Text>
        </Container>
      </Box>
    </Flex>
  );
}
