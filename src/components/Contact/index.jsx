import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { GrSend } from 'react-icons/gr';
import Reaptcha from 'reaptcha';

const { REACT_APP_API_URL } = process.env;

const { REACT_APP_RECAPTCHA_V2_KEY } = process.env;
const initContactForm = () => ({
  email: '',
  subject: '',
  message: '',
});

export default function Contact() {
  const [form, setForm] = useState(initContactForm);
  const [captcha, setCaptcha] = useState(0);
  const formRef = useRef();
  const focusRef = useRef();
  const captchaRef = useRef();
  const toast = useToast();

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

    // Send email using Axios
    axios.post(`${REACT_APP_API_URL}/contact`, {
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
    // Reset Form
    setForm(initContactForm());

    // Reset Captcha
    captchaRef.current.reset();

    return toast({
      title: 'TODO...',
      description: 'Your message has (not) been sent yet',
      status: 'error',
      duration: 5000,
      position: 'top',
      isClosable: true,
    });
  };

  const handleCaptcha = (value) => {
    setCaptcha(value);
  };
  return (
    <Flex justify="center" alignItems="center" minH="80dvh" p="2rem 1rem">
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
            <Button rightIcon={<GrSend />} type="submit">
              Send
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
