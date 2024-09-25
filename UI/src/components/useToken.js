import { useState } from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('shuvi_access_token');
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    localStorage.setItem('shuvi_access_token', userToken);
    setToken(userToken);
  }

  function removeToken() {
    localStorage.removeItem('shuvi_access_token');
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }

}

export default useToken;