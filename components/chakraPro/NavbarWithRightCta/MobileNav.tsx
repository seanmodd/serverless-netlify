import {
  Box,
  Button,
  Center,
  Flex,
  Portal,
  SimpleGrid,
  useBoolean,
  useFocusOnShow,
  VStack,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { HTMLMotionProps, motion, Variants } from 'framer-motion';
import * as React from 'react';
import FocusLock from 'react-focus-lock';
import NextLink from 'next/link';
import {
  HiEmojiHappy,
  HiHome,
  HiExclamationCircle,
  HiOutlineMenu,
  HiOutlineX,
  HiQuestionMarkCircle,
  HiVideoCamera,
} from 'react-icons/hi';
import { RemoveScroll } from 'react-remove-scroll';
import { Logo } from './Logo';
import { NavLink } from './NavLink';

const variants: Variants = {
  show: {
    display: 'revert',
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  hide: {
    opacity: 0.2,
    scale: 0.98,
    transition: { duration: 0.3, ease: 'easeIn' },
    transitionEnd: { display: 'none' },
  },
};

const Backdrop = ({ show }: { show?: boolean }) => (
  <Portal>
    <motion.div
      initial={false}
      animate={show ? 'show' : 'hide'}
      transition={{ duration: 0.8 }}
      variants={{
        show: { opacity: 1, display: 'revert' },
        hide: { opacity: 0, transitionEnd: { display: 'none' } },
      }}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        background: 'rgba(0,0,0,0.9)',
        inset: 0,
      }}
    />
  </Portal>
);

const Transition = (props: HTMLMotionProps<'div'> & { in?: boolean }) => {
  const { in: inProp, ...rest } = props;
  return (
    <motion.div
      {...rest}
      initial={false}
      variants={variants}
      animate={inProp ? 'show' : 'hide'}
      style={{
        transformOrigin: 'top right',
        position: 'absolute',
        width: 'calc(100% - 32px)',
        top: '24px',
        left: '16px',
        margin: '0 auto',
        zIndex: 1,
      }}
    />
  );
};

export const MobileNav = () => {
  const [show, { toggle, off }] = useBoolean();
  const ref = React.useRef<HTMLDivElement>(null);
  useFocusOnShow(ref, { visible: show, shouldFocus: true });

  return (
    <>
      <Box
        as="button"
        type="button"
        p="1"
        fontSize="2xl"
        color="gray.600"
        onClick={toggle}
        display={{ base: 'block', lg: 'none' }}
      >
        <HiOutlineMenu />
      </Box>

      <Transition in={show}>
        <RemoveScroll enabled={show}>
          <Backdrop show={show} />
        </RemoveScroll>
        <FocusLock disabled={!show} returnFocus>
          <Box
            bg={mode('gray.50', 'gray.800')}
            shadow="lg"
            rounded="lg"
            ref={ref}
            tabIndex={0}
            outline={0}
          >
            <Box pt="5" pb="6" px="5">
              <Flex justify="space-between" align="center">
                <Logo h="6" iconColor="blue.600" />
                <Box mr="-2" mt="-2">
                  <Center
                    as="button"
                    type="button"
                    onClick={off}
                    rounded="base"
                    p="1"
                    color={mode('gray.600', 'gray.400')}
                    _hover={{ bg: mode('gray.100', 'gray.600') }}
                  >
                    <Box srOnly>Close menu</Box>
                    <HiOutlineX aria-hidden fontSize="1.5rem" />
                  </Center>
                </Box>
              </Flex>
              <SimpleGrid as="nav" gap="6" mt="8" columns={{ base: 1, sm: 2 }}>
                <NavLink.Mobile icon={HiHome}>
                  <NextLink href="/#" passHref>
                    Home Page
                  </NextLink>
                </NavLink.Mobile>
                <NavLink.Mobile icon={HiExclamationCircle}>
                  <NextLink href="/nobackend" passHref>
                    To-Do List with No Backend
                  </NextLink>
                </NavLink.Mobile>
                <NavLink.Mobile icon={HiEmojiHappy}>
                  <NextLink href="/myIndex" passHref>
                    Landing Page
                  </NextLink>
                </NavLink.Mobile>
                <NavLink.Mobile icon={HiQuestionMarkCircle}>
                  <NextLink href="/search-api" passHref>
                    Search API App
                  </NextLink>
                </NavLink.Mobile>
                <NavLink.Mobile icon={HiVideoCamera}>
                  <NextLink href="/youtube-api" passHref>
                    YouTube API
                  </NextLink>
                </NavLink.Mobile>
              </SimpleGrid>
              <VStack mt="8" spacing="4">
                <Button w="full" colorScheme="twitter">
                  Start Free Trial
                </Button>
                <Box
                  color={mode('gray.900', 'gray.100')}
                  textAlign="center"
                  fontWeight="medium"
                >
                  Have an account?{' '}
                  <Box as="a" color={mode('blue.800', 'blue.300')}>
                    Log in
                  </Box>
                </Box>
              </VStack>
            </Box>
          </Box>
        </FocusLock>
      </Transition>
    </>
  );
};
