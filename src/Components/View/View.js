import React from 'react';
import { useEffect,useState,useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { collection, getFirestore, where,getDocs,query} from 'firebase/firestore';
import Firebase from '../../firebase/config';
function View() {
  const [sellerDetails, setSellerDetails] = useState()
  const {postDetails} = useContext(PostContext)
  const db = getFirestore(Firebase)
  useEffect(()=>{

     const fetchUserData = async ()=>{
      try{
        const {userId} = postDetails
        const q = query(collection(db, "users"), where("id", "==", userId));
        const productsDataSnapshot = await getDocs(q);
        // console.log("product snap :",productsDataSnapshot)
        productsDataSnapshot.forEach((doc)=>{
          setSellerDetails(doc.data())
        })
        // console.log('seller detail',sellerDetails)
      }catch(error){
        console.log(error)
      }
     }
     fetchUserData()
  },[])
 
  return (
    <div className="viewParentDiv">
    <div className="imageShowDiv">
      <img
        src={postDetails.imageUrl}
        alt=""
      />
    </div>
    <div className="rightSection">
     <div className="productDetails">
        <p>&#x20B9;{postDetails.price} </p>
        <span>{postDetails.name}</span>
        <p>{postDetails.category}</p>
        <span>{postDetails.createdAt}</span>
      </div>
      { 
      sellerDetails && <div className="contactDetails">
        <p>Seller details</p>
        <p>{sellerDetails.userName}</p>
        <p>{sellerDetails.phone}</p>
      </div>
      }
    </div>
    </div>
  );
}
export default View;