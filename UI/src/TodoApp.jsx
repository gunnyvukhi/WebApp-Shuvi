import { Grid, GridItem, Heading } from "@chakra-ui/react"
import TodoRightPart from "./components/TodoRightPart"

const TodoApp = () => {
  return (
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
        <TodoRightPart />
      </GridItem>
    </Grid>
  )
}

export default TodoApp