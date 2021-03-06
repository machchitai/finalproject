import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { useCookies } from 'react-cookie';
import LoginView from 'src/views/auth/LoginView';

const App = () => {
  const [cookies] = useCookies(['token']);
  const [isLogedin, setIsLogedIn] = useState(false);

  useEffect(() => {
    console.log(cookies.token);
    if (cookies && cookies.token) {
      setIsLogedIn(true);
    }
  }, []);

  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {(isLogedin) ? routing : <LoginView processLogedInState={setIsLogedIn} />}
    </ThemeProvider>
  );
};

export default App;
