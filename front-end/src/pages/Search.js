import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/searchContext'
import { useNavigate } from 'react-router-dom'
const Search = () => {
  const navigate = useNavigate();
  const [value, setValue] = useSearch()

  return (
    <Layout>
      <div className='container'>
        <div className='text-center'>
          <h1>Search Result</h1>
          <h6>{value.result.length < 1 ? 'No product found' : `Found ${value.result.length}`}</h6>

          <div className="d-flex flex-wrap d-flex2 mt-4">
            {value?.result.map((p) => (
              <div className="card m-1" style={{ width: "18rem" }}>
                <div>
                  <img
                    src={`https://backend-n7jv.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top "
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{p.name}</h3>
                    <h5 className="card-title">{`${p.price} $`}</h5>
                    <p className="card-text">{p.description}</p>
                    <button className="btn btn-primary ms-1" onClick={() => { navigate(`/product-detail/${p.slug}`) }}>
                      Show Detail
                    </button>
                    <button className="btn btn-secondary ms-1">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Search