import { useState, useEffect } from "react";
import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/adminMenu";
import axios from "axios";
import CatagoryForm from "../../components/layout/from/CatagoryForm";
import { toast } from "react-toastify";
import { Modal } from 'antd';



const CreateCatagory = () => {
  const [catagory, setCatagory] = useState([]);
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updateName, setUpdateName] = useState('')
  // handle form
const handleSubmit = async (e,) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4500/api/v1/catagory/create-catagory', { name })
      if (data?.success) {
        toast.success(`${data.message} named ${name}`)
        
        getAllCatagory()
      } else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error('some thing went wrong on from submit createCatagory.js line 33')
    }
  }


  //getting all catagory__________________________________
  const getAllCatagory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4500/api/v1/catagory/get-catagory`
      );

      if (data.success) {
        await setCatagory(data.catagory);

      }
    } catch (error) {
      console.log(error);
      toast.error("something wents wrong createCatagory.js line 51");
    }
  };

  useEffect(() => {
    getAllCatagory();
  }, []);


  // update catagory
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:4500/api/v1/catagory/update-catagory/${selected._id} `, { name: updateName })
      if (data.success) {
        toast.success(data.message)
        setSelected(null)
        setVisible('')
        getAllCatagory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('some thing wents wrong in crateCatagory.js line 64')

    }

  }


  // ===============delete catagory


  const handledelete = async (pId) => {

    try {
      const { data } = await axios.delete(`http://localhost:4500/api/v1/catagory/delete-catagory/${pId} `)
      if (data.success) {
        toast.success(data.message)
        getAllCatagory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('some thing wents wrong in crateCatagory.js line 64')

    }

  }




  return (
    <Layout title={"Dashboard - Create-Catagory"}>
      <div className="container-fluid">
        <div className="row">

          <div className="col-3">
            <AdminMenu />
          </div>

          <div className="col-9">
            <h1>Manages Catagory</h1>
            <div className="p-3 w-50">
              <CatagoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {catagory.map((c) => {
                    return (
                      <tr key={c._id}>
                        {" "}
                        <td>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-3" onClick={() => { setVisible(true); setUpdateName(c.name); setSelected(c) }}>Edit</button>
                          <button className="btn btn-danger ms-3" onClick={() => { handledelete(c._id) }}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => { setVisible(false) }} footer={null} visible={visible}>
              <CatagoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} />
            </Modal>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default CreateCatagory;
