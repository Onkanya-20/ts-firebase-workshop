import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ConfirmProvider } from 'material-ui-confirm';

import AuthenticatedApp from './authenticated-app';
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(',')
  }
});
function App() {
  return (
    <ConfirmProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthenticatedApp />
      </ThemeProvider>
    </ConfirmProvider>
  );
}

export default App;
