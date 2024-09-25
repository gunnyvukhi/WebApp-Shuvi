import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
// rafce

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
    <ChakraProvider>
      <App />
    </ChakraProvider>
)