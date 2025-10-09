import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [formData,setFormData]=useState({
    username : "",
    email : "",
    password : "",
    phone : ""
  })

  // initialize 3 states for posting data 
  const [loading,setLoading]=useState("")
  const [error,setError]=useState("")
  const [success,setSuccess]=useState("")

  // email validation
  const validateEmail=(email)=>{
    return /\S+@\S+\.\S+/.test(email);
}

// function to signup 
  const handleSubmit=async (e)=>{
    e.preventDefault()

    if(!validateEmail(formData.email)){
      alert("Enter a valid Email address")
      return;
    }
    setLoading("Please wait...")

    // define an empty envelope 
    const envelopedata=new FormData()
    envelopedata.append('username', formData.username)
    envelopedata.append('email',formData.email)
    envelopedata.append('phone', formData.phone)
    envelopedata.append('password',formData.password)

     // post data 
    try {
     
      const response=await axios.post("https://doreen98.pythonanywhere.com/api/signup",envelopedata)

      setSuccess(response.data.message)
      // reset 
      setLoading("")
    } catch (error) {
      setError(error.message)
      // reset 
      setLoading("")
    }

    
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

  return (
    <div className="mb-4 d-flex justify-content-center align-items-center  mt-4">
      <form onSubmit={handleSubmit} className='border rounded shadow p-4 w-50 '>
        <fieldset>
          <legend className='text-center fw-bold fs-3'>Sign Up</legend> 
          
          {/* bind the state  */}

          <h3 className='text-warning'>{loading}</h3>
          <h3 className='text-success'>{success}</h3>
          <h3 className="text-danger">{error}</h3>
          
          <input type="text"
          placeholder='Enter username' 
          name='username'
          value={formData.username}
          required
          className="rounded px-2 w-100 py-2 "
          onChange={handleChange}/> <br /><br />

          <input type="email"
          name='email'
          value={formData.email}
          required
          placeholder='Enter Email'
          className="rounded px-2 w-100 py-2 "
          onChange={handleChange}/> <br /><br />

          <input type="password"
          placeholder='Enter Password'
          value={formData.password}
          name='password' 
          required
          className="rounded px-2 w-100 py-2 "
          onChange={handleChange}/> <br /> <br />

          <input type="tel"
          name='phone'
          required
          value={formData.phone}
          placeholder='Enter Phone'
          className="rounded px-2 w-100 py-2 " 
          onChange={handleChange}/> <br /><br />

          <button type='submit' className='btn btn-primary rounded  w-100 py-2'>Sign Up</button>
          <p className='mt-2 mx-4 fs-5 fw-bold'>Already have an account ? <Link to="/signin">Sign In</Link></p>
      </fieldset>
      </form>
    </div>
  )
}

export default Signup