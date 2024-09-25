import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginScreen from './components/LoginScreen';
import TodoApp from './components/TodoApp';
import useToken from './components/useToken';

const App = () => {

  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div className="App">
        {!token && token!=="" && token!== undefined?
        <LoginScreen setToken={setToken} />
        :(
          <>
            <Routes>
              <Route exact path="/" element={<TodoApp removeToken={removeToken}/>}></Route>
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}


export default App