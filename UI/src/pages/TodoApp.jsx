import { CircularProgress, Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import axios from "axios";
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from "react";

import TodoRightPart from "../components/TodoRightPart";
const TodoApp = ({removeToken, token}) => {

  TodoApp.propTypes = {
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
      bg={'gray.100'}
      h='100vh'
      templateRows='repeat(10, 1fr)'
      templateColumns='repeat(20, 1fr)'
      gap={1}
    >
      <GridItem rowSpan={10} colSpan={3} bg='white' boxShadow={'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'}/>
      <GridItem rowSpan={10} colSpan={14} gap={1}>
        <Grid
          h='100%'
          templateRows='repeat(10, 1fr)'
          templateColumns='repeat(70, 1fr)'
        >
          <GridItem colSpan={2} rowSpan={8} />
          <GridItem colSpan={10} rowSpan={8}>
            <Heading h='10%' w='100%' display={'flex'} alignItems={'center'} justifyContent={"center"} as='h3' size={'md'}>MON (9/9)</Heading>
          </GridItem>
          <GridItem colSpan={10} rowSpan={8}>
            <Heading h='10%' w='100%' display={'flex'} alignItems={'center'} justifyContent={"center"} as='h3' size={'md'}>TUE (9/10)</Heading>
          </GridItem>
        </Grid>
      </GridItem>

      <GridItem rowSpan={10} colSpan={3} bg='white' boxShadow={'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'}>
        <TodoRightPart token={token} onLogout={removeToken} data={data}/>
      </GridItem>
    </Grid>}
    </>
  )
}

export default memo(TodoApp)