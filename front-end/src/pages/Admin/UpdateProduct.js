import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/adminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [catagory, setCatagory] = useState([]);
  const [singleCatagory, setSingleCatagory] = useState("");
  const [name, setName] = useState("");
  const [photos, setPhotos] = useState("");
  const [description, setDescription] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4500/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setQuantity(data.product.quantity);
      setPrice(data.product.price);
      setShipping(data.product.shipping);
      setDescription(data.product.description);
      setSingleCatagory(data.product.catagory._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //getting all catagory__________________________________
  const getAllCatagory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4500/api/v1/catagory/get-catagory`
      );
      if (data?.success) {
        await setCatagory(data?.catagory);
      }
    } catch (error) {
      console.log(error);
      toast.error("something wents wrong createCatagory.js ");
    }
  };

  useEffect(() => {
    getAllCatagory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("quantity", quantity);
      productData.append("price", price);
      productData.append("shipping", shipping);
      photos && productData.append("photos", photos);
      productData.append("catagory", singleCatagory);

      //update product

      const { data } = await axios.put(
        `http://localhost:4500/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        setTimeout(() => {
          toast.success("Data Updated SuccessFully");
        }, 100);
        navigate("/dashboard/admin/products");
      } else {
        toast.error("someThing wents wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something wents wrong in adding product");
    }
  };

//  delete product==================
const handleDelete=async()=>{
  try {
    let answer= window.prompt(`Type "${name}" To delete product `)
    if(answer!== name){ 
      toast.error('Incorrect name') 
      return
  }
    const {data}= await axios.delete(`http://localhost:4500/api/v1/product/delete-product/${id}`)
    setTimeout(() => {
      toast.success("Data Deleted SuccessFully");
    }, 100);
    navigate("/dashboard/admin/products");
  } catch (error) {
    console.log(error)
    toast.error('SomeThing wents wrong in deleting Product . Please Try again')
  }
}




  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-9">
            <h1>UpdateProduct</h1>
            <div className="m-1 w-75">
              {/* catagory  */}
              <Select
                bordered={false}
                placeholder="Select a catagory"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setSingleCatagory(value);
                }}
                value={singleCatagory}
              >
                {catagory?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              {/* photos */}

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-mb-12">
                  {photos ? photos.name : "Upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="images/*"
                    onChange={(e) => {
                      setPhotos(e.target.files[0]);
                    }}
                    hidden
                  ></input>
                </label>
              </div>

              {/* show photos     */}
              <div className="mb-3">
                {photos ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photos)}
                      alt="photo"
                      className="img img-responsive"
                      height={"200px"}
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:4500/api/v1/product/product-photo/${id}`}
                      alt="photo"
                      className="img img-responsive"
                      height={"200px"}
                    />
                  </div>
                )}
              </div>

              {/* name */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter Product name"
                  value={name}
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* price */}
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Enter Product Price"
                  value={price}
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* qunatity */}
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Enter Product Quantity"
                  value={quantity}
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* shipping */}
              <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping ? "Yes" : "No"}
              >
                <Option value="0">Yes</Option>
                <Option value="1">No</Option>
              </Select>

              {/* description */}
              <div className="mb-3">
              
                <textarea
                cols='30' rows='5'
                  type="text"
                  placeholder="Enter Description in detail"
                  value={description}
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* button */}
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update Product
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
