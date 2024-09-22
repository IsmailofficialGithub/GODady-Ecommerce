import React from 'react'
import Layout from '../components/layout/Layout'

const Aboutpage = () => {
  return (
    <Layout title={'AboutUs - Ecommerce'} description={'ecommerce-store'}>
      <h1 className='text-center mb-4'>About US</h1>
      <div className="container text-center">
        <div className=" mobile-row ">
          <img src="images/aboutus.jpeg" width='100%' />
          <div className=" contact-data">

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident illo debitis culpa, sequi fuga totam praesentium
              eligendi nulla esse. Perferendis minus explicabo dicta at!
              Mollitia dicta amet expedita aspernatur eaque.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident illo debitis culpa, sequi fuga totam praesentium
              eligendi nulla esse. Perferendis minus explicabo dicta at!
              Mollitia dicta amet expedita aspernatur eaque.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident illo debitis culpa, sequi fuga totam praesentium
              eligendi nulla esse. Perferendis minus explicabo dicta at!
              Mollitia dicta amet expedita aspernatur eaque.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Aboutpage