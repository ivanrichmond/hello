import React, {useNavigate} from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  useLoaderData,
  useNavigation,
  useOutlet
} from "react-router-dom";

import { useLocalStorage } from './useLocalStorage'
import { useAuth } from './useAuth'
import logo from './logo.svg';
import './App.css';

const AuthContext = React.createContext()

const ProtectedRoute = ({children}) => {
  const { user } = useAuth()
  // console.debug('useAuth(), user',useAuth(), user)

  if(!user){
    return <Navigate to='/'/>
  }
  return children
}

const dataLoader = async () => {
    const res = await fetch("/api")
 
    if(res.ok){
      const jsonData = await res.json()
      if(jsonData && jsonData?.message){
        return jsonData?.message
      } else {
        console.error("Data malformed: no message property")
        return null
      }
    } else {
      console.error("Data could not be retrieved from /api")
      return null
    }
}

const dataPoster = async () => {
  const data = {
    title: "Ivan is Awesome!",
    body: "I'm Ivan and I'm awesome!",
    userId: 666,
    id: 666
  }

  const res = await fetch("https://jsonplaceholder.typicode.com/posts",{
    body: JSON.stringify(data),
    headers: { 
      "Content-Type": "applicatin/json"
    },
    method: "POST",
  })

  const json = await res.json()
  console.log(json)
  return json
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<ProtectedRoute> <Root /> </ProtectedRoute>}>
    <Route index loader={dataLoader} element = {<Home/>} />
    <Route path='/login'  loader={dataPoster} 
      element = {<Login />} />
      {/* element = {<Login login = {userName => setUser(userName)} />} /> */}
    <Route path='/data'  loader={dataPoster} element = {<Data/>} />
    </Route>
  )
)

function Root() {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  )
}

function Navbar() {
  return (
    <div>
      <Link to="/"> Home </Link> |
      <Link to="/data"> Data </Link>
    </div>
  )
}


function Data() {
  let data = useLoaderData()
  const navigation = useNavigation()

  if(navigation.state === 'loading'){
    return (
      data = "Loading..."
    )
  }

  return (
    <div>
      DATA: {data.id || "DATA NOT AVAILABLE"}
    </div>
  )
}

function Home() {
  let user = true // TODO: Change this to the logged in user.
  let data = useLoaderData()
  const navigation = useNavigation()

  if(navigation.state === 'loading'){
    return (
      data = "Loading..."
    )
  }

  return user ? (
    <header className="App-header">
      <h1>Hello, {user}.</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <p>{data || "DATA NOT AVAILABLE"}</p>
    </header>
  ) : (
    <Navigate to='/login' />
  )
}

function Login() {
  const { login } = useAuth();
  const [user, setUser] = React.useState("");

  return (
    <form onSubmit={() => login(user)}>
      <input
        placeholder="Tell me your name."
        required="required"
        onChange={e => setUser(e.target.value)}
        value={user}
      />
      <button type="submit">
        Login
      </button>
    </form>
  )
}

function App() {
  const [user, setUser] = React.useState(null)
  return (
    <div className="App">
      <RouterProvider router = {router}/>
    </div>
  );
}

export default App;
