
import React, {useState, useEffect, useContext } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import Firebase from '../../firebase/config';
import { PostContext } from '../../store/PostContext';
// import { useHistory } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

function Posts() {
  const [products,setProducts] = useState([])
  const db = getFirestore(Firebase)
  const {setPostDetails} = useContext(PostContext)
  const history = useNavigate()

 
useEffect(()=>{
  const fetchData = async ()=>{
    try {
     const productsDataSnapshot = await getDocs(collection(db,'products'))
      const allPosts= productsDataSnapshot.docs.map((product)=>{
        return {
          ...product.data(),
          id:product.id
        }
      })
      console.log(allPosts)
      setProducts(allPosts)

    }catch(error){
      console.log('Error while fetching the products :',error)
    }
  }
  fetchData();
},[])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>

        <div className="cards">
        {
          products.map((product,index)=>{
            return (
                <div
                  className="card"
                  key={index}
                 onClick={()=>{
                  setPostDetails(product)
                 history('/viewPost')
                      }}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.imageUrl} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name"> {product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
            )
          })
        }
        </div>

      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;