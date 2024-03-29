import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import GlobalStyle from '~/components/GlobalStyle';

import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // </React.StrictMode>
  // <React.StrictMode>
    <AuthProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#D19C97',
            fontFamily: "Poppins"
          },
        }}
      >
        <GlobalStyle>
          <App />
        </GlobalStyle>
      </ConfigProvider>
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
