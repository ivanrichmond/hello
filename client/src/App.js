import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';

function Navbar() {
  return (
    <div>
      TODO: NAVBAR GOES HERE
    </div>
  )
}

function Home() {
  React.useEffect(() => {
    fetch("/api")
      .then(res => {
        if(res.ok){
          return res.json()
        } else {
          console.error("Data could not be retrieved from /api")
          return null
        }
      })
      .then(data => {
        if(data){
          if(data?.message){ console.error("Data malformed: no message property")}
          setData(data?.message)
        }
      })
  }, []);
  
  const [data, setData] = React.useState(null);
  return (
    <header className="App-header">
      <h1>Welcome to the Hello suite.</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <p>{!data ? "Loading..." : data}</p>
    </header>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <Home/>
          }>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
