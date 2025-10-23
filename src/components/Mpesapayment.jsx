import axios from 'axios';
import React , {useState} from 'react'
import { useLocation } from 'react-router-dom';

const Mpesapayment = () => {
  const {product} =useLocation().state ||  {};
  const imagepath='https://doreen98.pythonanywhere.com/static/images/'

  // initialize state for Mpesapayment
  const [amount,setAmount]=useState("")
  const [phone,setPhone]=useState ("")

// initialize state for posting
  const [loading,setLoading]=useState("")
  const [success,setSuccess]=useState("")
  const [error,setError]=useState("")

  // function to make payment 
  const handleSubmit= async (e)=>{
    e.preventDefault()
  
    setLoading("Please wait...")

    // define an empty envelope 
    const envelopedata=new FormData()

    // append data 
    envelopedata.append("amount", product.price)
    envelopedata.append("phone",phone)

    // post data 
    try {
      const response=await axios.post("http://doreen98.pythonanywhere.com/api/mpesa_payment",envelopedata)
      setSuccess(response.data.message)
      // reset loading 
      setLoading("")
    } catch (error) {
      setError(error.message)
      // reset loading 
      setLoading("")
      
    }

  }

  return (
    <div className='row justify-content-center mt-4 mb-4'>
      <div className="col-md-6 p-4 card shadow">
        <h3 className='text-warning'>{loading}</h3>
        <h3 className='text-danger'>{error}</h3>
        <h3 className="text-success">{success}</h3>
      <h1 className='text-info text-center'>Lipa Na Mpesa</h1>
      <img src={imagepath + product.automotive_photo} alt={product.name} className='mt-4 productimage' />
     
      <div className="card-body  ">
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


              <form onSubmit={handleSubmit}>
                  <input type="tel" placeholder='Enter phone 254xxxxx' className='form-control fs-5' onChange={(e)=>setPhone(e.target.value)} /> <br />
                  <input type="number" value={product.price} className='form-control fs-5' disabled />
              <button className='btn btn-dark w-100 mt-2'>Purchase now</button>
              </form>

            </div>
    </div>
    </div>
  )
}

export default Mpesapayment