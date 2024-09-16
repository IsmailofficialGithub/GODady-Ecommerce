import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/adminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from 'antd';
import { useNavigate } from "react-router-dom";
const { Option } = Select;



const CreateProduct = () => {
  const navigate = useNavigate();
  const [catagory, setCatagory] = useState([]);
  const [singleCatagory, setSingleCatagory] = useState('');
  const [name, setName] = useState('');
  const [photos, setPhotos] = useState('');
  const [description, setDescription] = useState('');
  const [shipping, setShipping] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');


  //getting all catagory__________________________________
  const getAllCatagory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4500/api/v1/catagory/get-catagory`
      );
      if (data?.success) {
        await setCatagory(data?.catagory);

      };
    }
    catch (error) {
      console.log(error);
      toast.error("something wents wrong createCatagory.js ");
    }
  };

  useEffect(() => {
    getAllCatagory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData()
      productData.append("name", name)
      productData.append("description", description)
      productData.append("quantity", quantity)
      productData.append("price", price)
      productData.append("shipping", shipping)
      productData.append("catagory", singleCatagory)
      productData.append("photos", photos)

      const { data } = await axios.post('http://localhost:4500/api/v1/product/create-product', productData)
      if (data?.success) {
         navigate('/dashboard/admin/products')
         setTimeout(()=>{
          toast.success('Data added SuccessFully')
         },100)
     
      } else {
        toast.error('someThing wents wrong')
      }
    } catch (error) {
      console.log(error)
      toast.error('something wents wrong in adding product');
    }


  }



  return (
    <Layout title={'Dashboard - Create Product'}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-9">                                       {/*main div */}

            <h1>CreateProduct</h1>

            <div className="m-1 w-75">                                 {/* secondary div */}

              <Select bordered={false} placeholder="Select a catagory"
                size="large" showSearch className="form-select mb-3"
                onChange={(value) => { setSingleCatagory(value) }}>
                {catagory?.map((c) => (
                  <Option key={c._id} value={c._id}
                  >
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-mb-12">
                  {photos ? photos.name : 'Upload photo'}
                  <input type="file"
                    name="photo"
                    accept="images/*"
                    onChange={(e) => { setPhotos(e.target.files[0]) }}
                    hidden>
                  </input>
                </label>
              </div>

              <div className="mb-3">
                {photos && (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photos)}
                      alt="photo"
                      className="img img-responsive"
                      height={'200px'}
                    />

                  </div>
                )}
              </div>

              <div className="mb-3">

                <input type="text"
                  placeholder="Enter Product name"
                  value={name}
                  className="form-control"
                  onChange={(e) =>
                    setName(e.target.value)

                  }
                />
              </div>

              <div className="mb-3">

                <input type="number"
                  placeholder="Enter Product Price"
                  value={price}
                  className="form-control"
                  onChange={(e) =>
                    setPrice(e.target.value)

                  }
                />
              </div>


              <div className="mb-3">

                <input type="number"
                  placeholder="Enter Product Quantity"
                  value={quantity}
                  className="form-control"
                  onChange={(e) =>
                    setQuantity(e.target.value)

                  }
                />
              </div>

              <Select bordered={false} placeholder="Select Shipping"
                size="large"
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value)
                }}
              >
                <Option value="0">Yes</Option>
                <Option value='1'>No</Option>

              </Select>

              <div className="mb-3">

                <textarea type="text"
                  placeholder="Enter Description in detail"
                  value={description}
                  className="form-control"
                  onChange={(e) =>
                    setDescription(e.target.value)

                  }
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>Add Product</button>

              </div>




            </div>                                                      {/* secondary div */}


          </div>                                                            {/*main div */}
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
// {catagory.map((c)=>{
//   <Option key={c._id} value={c.name}>{c.name}</Option>
// })}