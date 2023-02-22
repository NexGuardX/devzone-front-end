import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import { GrSend } from 'react-icons/gr';

const initContactForm = () => ({
  email: '',
  subject: '',
  message: '',
});

export default function Contact() {
  const [form, setForm] = useState(initContactForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm(initContactForm());
  };
  return (
    <Flex justify="center" alignItems="center" minH="80dvh" p="2rem 1rem">
      <Box p="2rem" border="1px solid gray" borderRadius={10} w="90%" maxW="800px">
        <form onSubmit={handleSubmit}>
          <VStack>
            <Heading as="h1">Contact</Heading>
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
            <Button rightIcon={<GrSend />} type="submit">
              Send
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
