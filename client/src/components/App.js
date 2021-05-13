import React from 'react';
import '../App.css';
import NavBar from './NavBar';
import AllBooks from './AllBooks';

class App extends React.Component {
  render() {
  return (
      <div className="mainpagebody">
        <NavBar />
        <AllBooks />
        </div>
  );
  }
}

export default App;
