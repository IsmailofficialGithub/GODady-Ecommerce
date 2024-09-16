import {useState,useEffect} from 'react'
import axios from 'axios';

 export default function useCatagory(){
     const [catagory,setCatagory]=useState([]);
// get catagory

const getCatagory=async()=>{
     
     try {
          const {data}=await  axios.get('http://localhost:4500/api/v1/catagory/get-catagory') 
          setCatagory(data?.catagory)
     } catch (error) {
          console.log(error)    
     }
}

useEffect(()=>{
     getCatagory()
},[])
return catagory
 }