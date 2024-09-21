import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useCatagory() {
     const [catagory, setCatagory] = useState([]);
     // get catagory

     const getCatagory = async () => {

          try {
               const { data } = await axios.get('https://backend-n7jv.onrender.com/api/v1/catagory/get-catagory')
               setCatagory(data?.catagory)
          } catch (error) {
               console.log(error)
          }
     }

     useEffect(() => {
          getCatagory()
     }, [])
     return catagory
}