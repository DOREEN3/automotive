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
  const handleChange=(e)=>{
    const {name,value ,files}=e.target
    if(name == "photo"){
      setFormData({...formData,[name] :files[0]})
    }else{
    setFormData ({...formData,[name] : value})
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    
  }

  return (
    <div className='mb-4 d-flex justify-content-center align-items-center mt-4'>

      <form onSubmit={handleSubmit} className="shadow border rounded p-4 w-50">
        <fieldset>
          <legend className="text-center fw-bold fs-3">Add Automotive</legend>
          
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

          <input type="number"
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