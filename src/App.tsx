import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AuthenticatedApp from './authenticated-app';
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(',')
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthenticatedApp />
    </ThemeProvider>
  );
}

export default App;
