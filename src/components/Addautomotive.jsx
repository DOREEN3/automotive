import axios from 'axios'
import React , {useState} from 'react'

const Addautomotive = () => {
  const [formData,setFormData]=useState({
    name :"",
    brand : "",
    compartibility : "",
    price : "",
    quantity : "",
    warrant : "",
    photo :""
  })

  // define state for posting data
  const [loading,setLoading]=useState("")
  const [error,setError]=useState("")
  const [success,setSuccess]=useState("")


  const handleChange=(e)=>{
    const {name,value ,files}=e.target
    if(name === "photo"){
      setFormData({...formData,[name] :files[0]})
    }else{
    setFormData ({...formData,[name] : value})
    }
  }

  const handleSubmit= async (e)=>{
    e.preventDefault()
    setLoading("Please wait...")
    
    //define empty envelope
    const envelopedata=new FormData()
    //append data
    envelopedata.append("name",formData.name)
    envelopedata.append("brand",formData.brand)
    envelopedata.append("compatibility",formData.compartibility)
    envelopedata.append("price",formData.price)
    envelopedata.append("stock_quantity",formData.quantity)
    envelopedata.append("warrant_period",formData.warrant)
    envelopedata.append("automotive_photo",formData.photo)

    //post data
    try {
      const response=await axios.post("https://doreen98.pythonanywhere.com/api/add_automotive",envelopedata)
      setSuccess(response.data.message)
      setLoading("")
    } catch (error) {
      setError(error.message)
      setLoading("")
      
    }
    
  }

  return (
    <div className='mb-4 d-flex justify-content-center align-items-center mt-4'>

      <form onSubmit={handleSubmit} className="shadow border rounded p-4 w-50">
        <fieldset>
          <legend className="text-center fw-bold fs-3">Add Automotive</legend>
          {/* binding variable */}

          <h2 className="text-info">{loading}</h2>
          <h2 className="text-success">{success}</h2>
          <h2 className="text-danger">{error}</h2>

          <input type="text"
          placeholder='Enter Automotive Name' 
          value={formData.name}
          name='name'
          required
          onChange={handleChange}
          className="rounded px-2 w-100 py-2"/> <br /><br />

        <input type="text"
          placeholder='Enter brand' 
          name='brand'
          required
          value={formData.brand}
          onChange={handleChange}
          className="rounded px-2 w-100 py-2"/> <br /><br />

        <input type="text"
          name='compartibility'
          value={formData.compartibility}
          required
          placeholder='Describe the compartibility of the automotive' 
          onChange={handleChange}
          className="rounded px-2 w-100 py-2"/> <br /><br />

        <input type="number"
        name='price'
        value={formData.price}
        placeholder='Enter the price' 
        onChange={handleChange}
        required
        className="rounded px-2 w-100 py-2"/> <br /><br />

         <input type="number"
          name='quantity'
          value={formData.quantity}
          placeholder='Enter stock quantity' 
          onChange={handleChange}
          required
          className="rounded px-2 w-100 py-2"/> <br /> <br />

          <input type="text"
          name='warrant'
          required
          value={formData.warrant}
          placeholder='Enter warrant period' 
          onChange={handleChange}
          className="rounded px-2 w-100 py-2"/> <br /><br />

          <label htmlFor="photo"  className="text-center fw-bold fs-5">Browse/Upload Automotive Photo</label>
          <input type="file"
          name='photo'
          required
          onChange={handleChange}
          className="rounded px-2 w-100 py-2 w-100"
         />
         <button type='submit' className="btn btn-primary py-2 w-100">Upload Automotive</button>
        </fieldset>
      </form>
    </div>
  )
}

export default Addautomotive