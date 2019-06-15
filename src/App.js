import React from 'react';
import Sidebar from 'containers/Sidebar';
import Main from 'containers/Main';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Sidebar />
        <Main />
      </header>
    </div>
  );
}

export default App;
