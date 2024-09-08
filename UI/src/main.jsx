import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import TodoApp from './TodoApp';
// rafce

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
    <ChakraProvider>
      <TodoApp />
    </ChakraProvider>
)