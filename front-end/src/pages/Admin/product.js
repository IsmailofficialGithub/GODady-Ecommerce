import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/adminMenu'
import { Link } from 'react-router-dom'

const Products = () => {

     const [products, setProducts] = useState([])
     const getAllProduct = async () => {
          try {
               const { data } = await axios.get(`https://backend-n7jv.onrender.com/api/v1/product/get-products`)
               setProducts(data.product)
          } catch (error) {
               console.log(error)
               toast.error('something wents wronge in getting all products in product')
          }
     }
     useEffect(() => {
          getAllProduct()
     }, [])

     return (
          <Layout>
               <div className="row">
                    <div className='col-md-3'>
                         <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                         <h1 className='text-center'>Product List </h1>

                         <div className='d-flex d-flex2 '>
                              {products.map((p) => (
                                   <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className='product-link '>
                                        <div className="card m-1 card-mobile" style={{ width: '18rem' }}>
                                             <div>
                                                  <img src={`https://backend-n7jv.onrender.com/api/v1/product/product-photo/${p._id}`} className="card-img-top  w-100" alt={p.name} />
                                                  <div className="card-body ">
                                                       <h3 className="card-title">{p.name}</h3>
                                                       <h5 className="card-title">{`${p.price} $`}</h5>
                                                       <p className="card-text">{p.description}</p>

                                                  </div>
                                             </div>
                                        </div>

                                   </Link>

                              ))}
                         </div>


                    </div>
               </div>
          </Layout>
     )
}

export default Products