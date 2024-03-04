import React, { useContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { collection,getFirestore, addDoc } from "firebase/firestore"; 
import {useNavigate} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/FirebaseContext';
import './Signup.css';

export default function Signup() {
  const history = useNavigate()
  const [userName,setUsername] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const {firebase} = useContext(FirebaseContext)
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db =getFirestore(firebase)
    try{

     const userCredential = await createUserWithEmailAndPassword(auth, email, password)
     console.log('userCredetial :',userCredential)
     const updatePro = await updateProfile(auth.currentUser,{
      displayName:userName
     });
     console.log('updatProfie :',updatePro);
     const docRef = await addDoc(collection(db, "users"), {
      id:userCredential.user.uid,
      userName:userName,
      phone:phone
    });
    console.log("Document written with ID: ", docRef.id);
    if(docRef.id){
      history("/login")
    }

    } 
      catch(error){
        console.log("Error while creating user :",error)
      }
}

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='Logo'></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={userName}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="femail"
            name="email"
           value={email}
           onChange = {(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="fnumber"
            name="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="fpassword"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handleSubmit}>Signup</button>
        </form>
        <a href='login'>Login</a>
      </div>
    </div>
  );
}
