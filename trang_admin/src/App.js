import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, Button } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { useCookies } from 'react-cookie';
import LoginView from 'src/views/auth/LoginView';

const App = () => {
  const routing = useRoutes(routes);
  const [cookies] = useCookies(['token']);
  const [isLogedin, setIsLogedIn] = useState(false);

  const handleTestCookie = () => {
  };

  useEffect(() => {
    console.log(cookies.token);
    if (cookies && cookies.token) {
      setIsLogedIn(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {(isLogedin) ? routing : <LoginView processLogedInState={setIsLogedIn} />}
      <Button onClick={handleTestCookie}>Test Cookie</Button>
    </ThemeProvider>
  );
};

export default App;
