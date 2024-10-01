import { SearchIcon } from "@chakra-ui/icons";
import { CircularProgress, Container, Grid, GridItem, Heading, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import axios from "axios";
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from "react";
// Supports weights 400-700
import '@fontsource-variable/dancing-script';
import ProfileNemu from "../components/ProfileNemu";


const Home = ({removeToken, token}) => {

  Home.propTypes = {
    removeToken: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
    };

  const [data, setData] = useState({})

  useEffect(() => {
    axios({
      method: "GET",
      url:"http://127.0.0.1:5000/get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response.data)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }, [token]);

  return (
    <>
    {(data.user_info == undefined) ? <Container mt={'8%'}><CircularProgress isIndeterminate color='blue.300' size={'md'} /></Container> :

    <Grid
      bg={'#242424'}
      h='100vh'
      templateRows='repeat(10, 1fr)'
      templateColumns='repeat(20, 1fr)'
    >
      <GridItem rowSpan={10} colSpan={1} bg='#161817' />
      
      <GridItem rowSpan={10} colSpan={19}>
        <Grid
          h='100%' padding={2}
          templateRows='repeat(10, 1fr)'
          templateColumns='repeat(10, 1fr)'
          gap={1}
        >
          <GridItem colSpan={10} rowSpan={1}>
            <Grid
                h={'100%'} w={'100%'}
                templateRows='repeat(1, 1fr)'
                templateColumns='repeat(20, 1fr)'
            >
                <GridItem colSpan={4} rowSpan={1}>
                    <Container h={'100%'} w={'100%'} display={'flex'} alignItems={'center'}>
                        <InputGroup h={'40px'}>
                            <InputLeftElement pointerEvents='none'>
                                <SearchIcon color='white' />
                            </InputLeftElement>
                            <Input type='text' placeholder='Tìm kiếm tại đây'  borderRadius={24} bg={'#303030'} color={'gray.200'}
                            _placeholder={{ opacity: 0.9, color: '#606060' }} variant='unstyled'/>
                        </InputGroup>
                    </Container>
                </GridItem>

                <GridItem colSpan={11} rowSpan={1}>
                    <Heading h='100%' w='100%' display={'flex'} alignItems={'center'}
                     justifyContent={"center"} as='h3' size={'lg'} color='white'
                     fontFamily={'Dancing Script Variable'}
                     >
                        Lịch trình của bạn
                    </Heading>
                </GridItem>

                <GridItem colSpan={5} rowSpan={1}>
                    <Container h={'100%'} w={'100%'} display={'flex'} alignItems={'center'} flexDirection={'row-reverse'}>
                        <ProfileNemu token={token} onLogout={removeToken} userInfo={data.userInfo}/>
                    </Container>
                </GridItem>
            </Grid>
            
          </GridItem>

          <GridItem colSpan={8} rowSpan={6} bg={'white'}/>

          <GridItem colSpan={2} rowSpan={9} bg={'white'}/>

          <GridItem colSpan={8} rowSpan={3} bg={'white'}/>
        </Grid>
      </GridItem>
    </Grid>}
    </>
  )
}

export default memo(Home)