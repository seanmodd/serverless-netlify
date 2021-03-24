import { Flex, Heading, Spacer } from '@chakra-ui/layout';
import React from 'react';
import { useColorModeValue as mode } from '@chakra-ui/color-mode';
import unsplash from '../components/api/unsplash';
import Navbar from '../components/chakraPro/NavbarWithRightCta/Navbar';
import VideoList from '../components/udemy/VideoList';
import YouTubeSearch from '../components/udemy/YouTubeSearch';


const pressedStyle = {
  width: 'auto',
  transition: 'all 0.5s ease-out',
  textShadow: '3px 3px #f2ff00',
};

const OtherSideHeading = ({ children }) => (
  <>
    <Heading
      color={mode('gray.900', 'gray.50')}
      fontSize={{ base: '25px', md: '30px', lg: '35px' }}
      fontWeight="200"
      mt={125}
    >
      {children}
    </Heading>
  </>
);

const SideHeading = ({ children }) => (
  <>
    <Heading
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      textShadow="3px 3px #ff00ae"
      my={10}
      fontSize={['40px', '50px', '60px', '70px']}
      _hover={pressedStyle}
    >
      {children}
    </Heading>
  </>
);
const MyFlex = ({ children }) => (
  <>
    <Flex
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      mb={40}
      flexDirection="column"
    >
      {children}
    </Flex>
  </>
);
const SeanFlex = ({ children }) => (
  <>
    <Flex d="flex" flexDirection="column" alignItems="center">
      {children}
    </Flex>
  </>
);
class App extends React.Component {
  state = { images: [] };

  onSearchSubmit = async (term) => {
    const response = await unsplash.get('/search/photos', {
      params: { query: term },
    });
    this.setState({ images: response.data.results });
  };

  render() {
    return (
      <>
        <Navbar />
        <SeanFlex>
          <OtherSideHeading>Welcome to...</OtherSideHeading>
          <SideHeading>YouTube API App</SideHeading>

          <YouTubeSearch onSubmit={this.onSearchSubmit} />
          <MyFlex>
            <div align="center">Found: {this.state.images.length} images</div>
            <VideoList images={this.state.images} />
          </MyFlex>
        </SeanFlex>
      </>
    );
  }
}
export default App;