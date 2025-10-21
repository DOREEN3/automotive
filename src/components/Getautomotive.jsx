import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Getautomotive = () => {
  let navigate=useNavigate() 

  const[sortOrder,setSortOrder]=useState("")
  const[searchTerm,setSearchTerm]=useState("")  

  const [loading, setLoading] = useState("")
  const [products, setProducts] = useState([])
  const [error, setError] = useState("")

  const getproducts = async () => {
    setLoading("Please wait...")
    try {
      const response = await axios.get("https://doreen98.pythonanywhere.com/api/get_automotive")
      setProducts(response.data)
      setLoading("")
    } catch (error) {
      setError(error.message)
      setLoading("")
    }
  }

  useEffect(() => {
    getproducts()
  }, [])

  const imagepath = 'https://doreen98.pythonanywhere.com/static/images/'

  return (
    <div className='container-fluid'>
      <h3 className="text-primary text-center my-4">Available Automotives</h3>

      <div className="row p-4">
        <div className="col-md-3">
          <input type="text" placeholder='Search by name' value={searchTerm}
          onClick={(e)=>setSearchTerm(e.target.value)}className='w-100' style={{height:"35px",padding:"10px"}}/>
        </div>
        <div className="col-md-3">
          <select name="sortOrder" id="sortOrder" value={sortOrder} onClick={(e)=>setSortOrder(e.target.value)} className='w-100' style={{height:"35px"}}>
            <option value="All categories">All categories</option>
            <option value="Name">Name</option>
            <option value="Brand">Brand</option>
          </select>
        </div>
        <div className="col-md-2">
          <select name="sortOrder" id="sortOrder" className='w-100' style={{height:"35px"}}>
            <option value="Min">Min Price</option>
          </select>
        </div>
        <div className="col-md-2">
          <select name="sortOrder" id="sortOrder" className='w-100' style={{height:"35px"}}>
            <option value="Max">Max Price</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-dark w-100 border rounded">Reset</button>
        </div>

      </div>
      {loading && <p className="text-center">{loading}</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      <div className='row p-4'>
        {products.map((product) => (
          <div  className='col-md-4 d-flex align-items-stretch justify-content-center mb-4'>
            <div className="card h-100 shadow card-margin" style={{ maxWidth: '30rem' }}>
              <img src={imagepath + product.automotive_photo} alt={product.name} className='productimage mt-2' />
              <div className="card-body ">
              <h4 className='text-primary fw-bold'>{product.name}</h4>

              <h5 className='text-secondary'>
                <span className='fw-semibold'>Brand:</span> {product.brand}
              </h5>

              <h5 className='text-muted fst-italic'>
                <span className='fw-semibold'>Compatibility:</span> {product.compartibility}
              </h5>

              <h5 className='text-secondary'>
                <span className='fw-semibold'>Warranty:</span> {product.warrant_period}
              </h5>

              <h5 className='text-info'>
                <span className='fw-semibold'>Stock Quantity:</span> {product.stock_quantity}
              </h5>

              <h4 className='text-success fw-semibold mb-3'>
                Price: KSH. {product.price}
              </h4>

              <button className='btn btn-success w-100 mt-2'onClick={()=>navigate("/mpesapayment", {state : {product}})} >Purchase now</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Getautomotive
