import React from 'react';
import './App.css';

import { config } from './constants'
import BingoBoard from './pages/BingoBoard';
import BingoRules from './pages/BingoRules';

function App() {
  return (
    <div className="App" style={{padding: "10px"}}>
      <BingoBoard URL_BASE={config.url.API_URL}/>
      <BingoRules URL_BASE={config.url.API_URL}/>
    </div>
  );
}

export default App;
