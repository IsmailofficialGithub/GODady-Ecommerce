import React from 'react'
import { NavLink } from 'react-router-dom'


const AdminMenu = () => {
  return (
    <>
      <div className='text-center m-3 p-3'>

        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink to={'/dashboard/admin/create-catagory'} className="list-group-item list-group-item-action">Create Catagory</NavLink>
          <NavLink to={'/dashboard/admin/create-product'} className="list-group-item list-group-item-action">Add product</NavLink>
          <NavLink to={'/dashboard/admin/user'} className="list-group-item list-group-item-action">Users</NavLink>
          <NavLink to={'/dashboard/admin/products'} className="list-group-item list-group-item-action">All products</NavLink>
          <NavLink to={'/dashboard/admin/orders'} className="list-group-item list-group-item-action">All Orders</NavLink>
        </div>
      </div>
    </>
  )
}

export default AdminMenu