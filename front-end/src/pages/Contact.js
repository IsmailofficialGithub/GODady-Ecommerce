import React from "react";
import Layout from "../components/layout/Layout";
function Contact() {
  return (
    <Layout title={'contact us - Ecommerce'} description={'ecommerce-store'}>
          <h1 className='text-center mb-4'>Contact US</h1>
      <div className="container text-center">
        <div className="row">
          <div className="col-8">
            <img src="images/contact.jpeg" />
          </div>
          <div className="col-4 contact-data">
            <ul>
              
              <li>☎️ Phone : 024233223</li>
              <li>📧 Email :hello@gmail.com</li>
              <li>🏢 Address :pakistan Islamabad</li>
              <li>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident illo debitis culpa, sequi fuga totam praesentium
                  eligendi nulla esse. Perferendis minus explicabo dicta at!
                  Mollitia dicta amet expedita aspernatur eaque.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
