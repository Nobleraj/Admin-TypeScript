import React,{StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'rgb(26,32,44)',
      },
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);


root.render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
