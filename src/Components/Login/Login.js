import React, { useState} from 'react';
// import { FirebaseContext } from '../../store/FirebaseContext';

import Logo from '../../olx-logo.png';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {useNavigate} from 'react-router-dom'
function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [isUserNotExists,setIsUserNotExists] =useState(false)
  const history = useNavigate()
  // const {firebase} = useContext(FirebaseContext)
  // const handleSignup = async (e)=>{
  //   e.preventDefault();
  //   // firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
  //   //   alert('hello')
  //   // })
  //   try{
  //     const auth = getAuth()
  //     console.log("Auth :",auth)
  //     const userSignIn = await signInWithEmailAndPassword(auth,email,password)
  //     if(userSignIn){
  //       alert("success")
  //     } else{
  //       alert('failled')
  //     }
  //     console.log(userSignIn)
  //   }catch(error){
  //     alert(error)
  //     console.log("Error while sign in ",error)
  //   }
  // }

  const handleSignup  =(e)=>{
    e.preventDefault();
    const auth = getAuth()
        console.log("Auth :",auth)
    signInWithEmailAndPassword(auth,email,password)
    .then(auth =>{
      if(auth){
        setIsUserNotExists(false)
        alert('Success')
        history('/')
        console.log('auth :',auth)
      }
    })
    .catch((error)=>{
      setIsUserNotExists(true)
      alert(error.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='Logo'></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          {isUserNotExists && <p className='userNotExist'>User not Exist Please Signup</p>}
          <button onClick={handleSignup}>Login</button>
        </form>
        <a href='/signup' >Signup</a>
      </div>
    </div>
  );
}

export default Login;
