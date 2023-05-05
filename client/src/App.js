import React from 'react';

// import logo from './logo.svg';
// import html5 from './html5.png';
// import Login from './components/loginIntuit.jsx'
import './App.css';
// import Carrossel from './components/carrossel.jsx';
// import Login from './components/login.jsx';

function App() {
  const [data, setData] = React.useState(false);

  React.useEffect(() => {
    // fetch("/api")
    //   .then(res => res.json())
    //   .then(data => {
    //     if(!data.message){ console.error("data malformed: no message property")}
    //     setData(data?.message)
    //   })
    
  }, []);

  return (
    <div>
      <input type = 'button' onClick = {() => setData(!data)} value='Toggle Data'/>
      <p>{!data ? "Loading..." : data}</p>
      {data &&
        <p>We have data!</p>
      }
      {/* <header className="App-header"> */}
        {/* <Login /> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* </header> */}
    </div>
  );
}

export default App;
