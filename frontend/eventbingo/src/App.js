import React from 'react';
import './App.css';

import { config } from './constants'
import BingoBoard from './pages/BingoBoard';
import BingoRules from './pages/BingoRules';

function App() {
  return (
    <div className="App">
      <BingoBoard URL_BASE={config.url.API_URL}/>
      <BingoRules URL_BASE={config.url.API_URL} style={{padding: "100px"}}/>
    </div>
  );
}

export default App;
