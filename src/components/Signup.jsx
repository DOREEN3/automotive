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

  // state to validate the form inputs
  const [errors,setErrors]=useState({})  

  // initialize 3 states for posting data 
  const [loading,setLoading]=useState("")
  const [error,setError]=useState("")
  const [success,setSuccess]=useState("")

  // validation on inputs 

  // email validation
  const validateEmail=(email)=>{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// password validation 
const validatePassword=(password)=>{
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)
}

//username validation 
const validateUsername=(username)=>{
  return  /^[A-Za-z][A-Za-z0-9_]{2,19}$/.test(username)
}

//phone validation
const validatePhone=(phone)=>{
  return /^(?:\+254|0)(7\d{8}|1\d{8})$/.test(phone)
}

//check if the inputs meet the validation
 const validateField = (name, value) => {
    switch (name) {
      case "username":
        return validateUsername(value)
          ? ""
          : "Username must be 3–20 characters. Letters, numbers, underscore only.";

      case "email":
        return validateEmail(value)
          ? ""
          : "Enter a valid email address.";

      case "phone":
        return validatePhone(value)
          ? ""
          : "Phone must be Kenyan format (0712345678 or +254712345678).";

      case "password":
        return validatePassword(value)
          ? ""
          : "Password needs uppercase, lowercase, number, special character, 8+ chars.";

      default:
        return "";
    }
  };

   // Check if the form is valid
   const isFormValid =
   Object.values(errors).every((e) => e === "") &&
   Object.values(formData).every((v) => v !== "");



// function to signup 
  const handleSubmit=async (e)=>{
    e.preventDefault()
    if (!isFormValid) {
      alert("Please fix all errors before submitting.");
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
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
          onChange={handleChange}/> 
           {errors.username && <p className="text-danger">{errors.username}</p>}
           <br /><br />

          <input type="email"
          name='email'
          value={formData.email}
          required
          placeholder='Enter Email'
          className="rounded px-2 w-100 py-2 "
          onChange={handleChange}/>
           {errors.email && <p className="text-danger">{errors.email}</p>} <br /><br />

          <input type="password"
          placeholder='Enter Password'
          value={formData.password}
          name='password' 
          required
          className="rounded px-2 w-100 py-2 "
          onChange={handleChange}/>
           {errors.password && <p className="text-danger">{errors.password}</p>} <br /> <br />

          <input type="tel"
          name='phone'
          required
          value={formData.phone}
          placeholder='Enter Phone'
          className="rounded px-2 w-100 py-2 " 
          onChange={handleChange}/>
           {errors.phone && <p className="text-danger">{errors.phone}</p>} <br /><br />

          <button type='submit' disabled={!isFormValid} className='btn btn-primary rounded  w-100 py-2'>Sign Up</button>
          <p className='mt-2 mx-4 fs-5 fw-bold'>Already have an account ? <Link to="/signin">Sign In</Link></p>
      </fieldset>
      </form>
    </div>
  )
}

export default Signup