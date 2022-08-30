import React, { useEffect } from 'react';
import './App.css';
import Main from './page/Main';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';


const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
