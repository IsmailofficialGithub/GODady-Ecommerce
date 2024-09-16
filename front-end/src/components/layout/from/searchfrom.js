import React from "react";
import { useSearch } from "../../../context/searchContext";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Searchfrom = () => {
  const [values, setValues] = useSearch();
  const navigate=useNavigate();

const handleSubmit =async(e)=>{
  e.preventDefault();
  try {
    const {data}=await axios.get(`http://localhost:4500/api/v1/product/search-product/${values.keyword}`)
    setValues({...values,result:data});
    navigate('/search');
  } catch (error) {
    console.log(error)
  }

}

  return (
    <>
      <form className="d-flex " role="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="form-control me-2"
          placeholder="search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => {
            setValues({ ...values, keyword: e.target.value });
          }}
        ></input>
        <button className="btn btn-primary mr-2">Search</button>
      </form>
    </>
  );
};

export default Searchfrom;
