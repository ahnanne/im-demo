import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import GlobalStyles from 'lib/GlobalStyles';
import RecoilProvider from 'components/providers/RecoilProvider';
import QueryProvider from 'components/providers/QueryProvider';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <RecoilProvider>
        <GlobalStyles />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilProvider>
    </QueryProvider>
  </React.StrictMode>,
);
