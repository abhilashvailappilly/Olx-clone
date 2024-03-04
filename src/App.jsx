import React, { useContext, useEffect,Suspense,lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Post from './store/PostContext';
// import Signup from './Pages/Signup';
// import Login from './Pages/Login';
// import Create from './Pages/Create';
// import View from './Pages/ViewPost';
import { AuthContext } from './store/FirebaseContext';
import './App.css';
// import Home from './Pages/Home';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const Home = lazy(() => import("./Pages/Home"));
const View = lazy(() => import("./Pages/ViewPost"));
const Create = lazy(() => import("./Pages/Create"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));

function App() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (User) => {
      if (User) {
        setUser(User);
      } else {
        console.log('User is signed off');
      }
    });
  }, [setUser]);

  return (
    <div>
      <Post>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path='/signup' element={<Signup/>} />
            
              <Route path='/login' element={  <Login />} />
              
              <Route path='/create' element={  <Create />}/>
              
              <Route path='/viewPost' element={  <View />}/>
              
            </Routes>
        </Router>
      </Suspense>
      </Post>
    </div>
  );
}

export default App;
