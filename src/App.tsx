import React, { FC, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { customTheme } from './theme/customTheme';
import { Dashboard } from './pages/dashboard';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ComposeContext from './context/compose.context';
import { rootContext } from './context/root.context';

// Create a Query Client
const queryClient = new QueryClient();

const App: FC = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <ComposeContext components={rootContext}>
        <ThemeProvider theme={customTheme}>
          <CssBaseline>
            <Dashboard></Dashboard>
          </CssBaseline>
        </ThemeProvider>
      </ComposeContext>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
};
export default App;
