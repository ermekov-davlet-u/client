import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';
import MainWrap from './page/index';



function App() {

  

  return (
    <Provider store={store}>
      <div className="App">
        <MainWrap />
      </div>
    </Provider>
  );
}

export default App;
