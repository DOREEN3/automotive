import axios from 'axios'
import React , {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Signin = () => {
  let navigate= useNavigate()
  const [formData,setFormData]=useState({
    email : "",
    password : ""
  })
  
  const [loading,setLoading]=useState("")
  const [success,setSuccess]=useState("")
  const [error,setError]=useState("")

  const handleSubmit=async (e)=>{
    e.preventDefault()
    setLoading("Please wait...")

    const envelopedata=new FormData()
    envelopedata.append('email',formData.email)
    envelopedata.append('password',formData.password)
  
    try {
      const response= await axios.post("https://doreen98.pythonanywhere.com/api/signin",envelopedata)
      setSuccess(response.data.message)
      if (response.data.user){
        navigate("/")
      }
      // save user to localStorage
      localStorage.setItem('user', response.data.user)
      setLoading("")
    } catch (error) {
      setError(error.message)
      setLoading("")
      
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

  return (
    <div className='mb-4 d-flex justify-content-center align-items-center mt-4'>

      <form onSubmit={handleSubmit} className="shadow border rounded p-4 w-50">
        <fieldset>
          <legend className="text-center fw-bold fs-3">Sign In</legend>
          {/* bind the state  */}

          <h3 className='text-warning'>{loading}</h3>
          <h3 className='text-success'>{success}</h3>
          <h3 className="text-danger">{error}</h3>
          
          <input type="email"
          name='email'
          value={formData.email} 
          required
          placeholder='Email'
          onChange={handleChange}
          className="rounded px-2 w-100 py-2 "/> <br /><br />
          <input type="password"
          name='password'
          value={formData.password} 
          placeholder='Password'
          required
          onChange={handleChange}
          className="rounded px-2 w-100 py-2 "/> <br /><br />
          <button className="btn btn-primary rounded py-2 w-100">Sign In</button>
          <p className="fw-bold mt-2 mx-4 fs-5">Don't have an account ?
            <Link to="/signup">Sign Up</Link>
          </p>
        </fieldset>
      </form>
    </div>
  )
}

export default Signin