import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './components/useToken';
import Home from './pages/Home';
import LoginScreen from './pages/LoginScreen';

const App = () => {

  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div className="App">
        {!token && token!=="" && token!== undefined?
        <LoginScreen setToken={setToken}/>
        :(
          <>
            <Routes>
              <Route exact path="/" element={<Home token={token} removeToken={removeToken}/>}></Route>
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}


export default App