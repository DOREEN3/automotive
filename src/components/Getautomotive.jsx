import axios from 'axios'
import React ,{useState,useEffect}from 'react'

const Getautomotive = () => {
  // initialize 3 states
  const [loading,setLoading]=useState("")
  const [products,setProducts]=useState([])
  const [error,setError]=useState("")

  const getproducts= async ()=>{
    setLoading("Please wait...")
    try {
      const response=await axios.get("https://doreen98.pythonanywhere.com/api/get_automotive")
      setProducts(response.data)
      setLoading("")
    } catch (error) {
      setError(error.message)
      setLoading("")
    }
  }

  useEffect(()=>{
    getproducts()
  },[])
  //check if products exist
  console.log(products)
  return (
    <div className='row'>
      <h3 className="text-primary text-center">Available Automotives</h3>
      {products.map(product=>(

  <div className='col-md-4 justify-content-center mb-4'>
{/* card with equal sizes */}
<div className="card shadow card-margin">
  {/* card image  */}
  <img src="" alt="" />
  <div className="card-body">
    <h5>{product.name}</h5>
    <h5>{product.brand}</h5>
    <h5>{product.price}</h5>
    <h5>{product.compatability}</h5>
    <h5>{product.warrant_period}</h5>
    <h5>{product.stock_quantity}</h5>

  </div>
</div>

</div>
))}
    </div>
  )
}

export default Getautomotive