import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  useColorModeValue as mode,
  VisuallyHidden,
} from '@chakra-ui/react';

import * as React from 'react';
import NextLink from 'next/link';
import DarkModeSwitch from './DarkModeSwitch';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { NavLink } from './NavLink';

const Navbar = () => (
  <>
    <Box w="100%" sx={{ position: 'fixed', zIndex: 10 }}>
      <Box as="header" bg={mode('white', 'gray.800')} borderBottomWidth="1px">
        <Box maxW="7xl" mx="auto" py="4" px={{ base: '6', md: '8' }}>
          <Flex as="nav" justify="space-between">
            <HStack spacing="8">
              <Box as="a" href="#" rel="home">
                <VisuallyHidden>Envelope app</VisuallyHidden>
                <Logo h="6" iconColor="blue.500" />
              </Box>
              <DarkModeSwitch />
              <HStack display={{ base: 'none', lg: 'flex' }} spacing="8">
                <NavLink.Desktop active>
                  <NextLink href="/#" passHref>
                    Home Page
                  </NextLink>
                </NavLink.Desktop>
                <NavLink.Desktop>
                  <NextLink href="/youtube/tasktracker#" passHref>
                    To-Do List
                  </NextLink>
                </NavLink.Desktop>
                <NavLink.Desktop>
                  <NextLink href="/myIndex" passHref>
                    My Index aka Tester Page
                  </NextLink>
                </NavLink.Desktop>
                <NavLink.Desktop>Help</NavLink.Desktop>
              </HStack>
            </HStack>
            <Flex align="center">
              <HStack spacing="8" display={{ base: 'none', md: 'flex' }}>
                <NavLink.Desktop>Log in </NavLink.Desktop>
                <Button colorScheme="blue" rounded="full">
                  Start Free Trial
                </Button>
              </HStack>
              <Box ml="5">
                <MobileNav />
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  </>
);
export default Navbar;