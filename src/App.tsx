import React from 'react';
import './App.css';
import Header from './Header';
import BowlersTable from './components/BowlersTable';

function App() {
  return (
    <div className="App">
      <Header /> {/* Include the Header component here */}
      <h1>Bowling League Bowlers</h1>
      <BowlersTable />
    </div>
  );
}

export default App;
