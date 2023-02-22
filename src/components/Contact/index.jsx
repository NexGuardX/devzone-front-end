import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { GrSend } from 'react-icons/gr';

const { REACT_APP_RECAPTCHA_V2_KEY } = process.env;
const initContactForm = () => ({
  email: '',
  subject: '',
  message: '',
});

export default function Contact() {
  const [form, setForm] = useState(initContactForm);
  const [captcha, setCaptcha] = useState(false);
  const formRef = useRef();
  const toast = useToast();

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
    setForm(initContactForm());
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
              <Input type="email" name="email" value={form?.email} onChange={handleChange} />
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
            <ReCAPTCHA sitekey={REACT_APP_RECAPTCHA_V2_KEY} onChange={handleCaptcha} />,
            <Button rightIcon={<GrSend />} type="submit">
              Send
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
