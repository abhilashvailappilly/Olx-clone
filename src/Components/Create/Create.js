import React, { Fragment, useContext, useState } from 'react';
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
// import firebase from 'firebase/app';
// import 'firebase/storage';

import './Create.css';
import Header from '../Header/Header';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import Firebase from '../../firebase/config';
import { AuthContext } from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('');
  const [image,setImage] = useState(null);
  const db =getFirestore(Firebase)
  const {user} = useContext(AuthContext)
  const history = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const storage = getStorage();
    const mountainsRef = ref(storage,`images/${image.name}`)
    console.log(mountainsRef.name)
    if(mountainsRef){
      uploadBytes(mountainsRef,image).then(async (snapshot)=>{
        console.log(snapshot)
        const url = await getDownloadURL(snapshot.ref)
        console.log(url)
        if(url){
          // console.log(user)
          const saveData = await addDoc(collection(db,'products'),{
            name,
            category,
            price,
            imageUrl:url,
            userId:user.uid,
            createdAt:new Date().toDateString()
          });
        
          console.log(saveData)
          if(saveData){
            console.log('Succes uploaded')
            history('/')
          } else {
            alert('Failed to create')
          }

        }

       
      })
      .catch((err)=>{
        console.log(err.message)
      })
    }
    // console.log(mountainsRef.fullPath)
  }
  return (
    <Fragment>
      <Header />
      {/* <card> */}
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="Name"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="price" name="Price" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) :''}></img>
          <form>
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} 
             type="file" />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
          </form>
        </div>
      {/* </card> */}
    </Fragment>
  );
};

export default Create;
