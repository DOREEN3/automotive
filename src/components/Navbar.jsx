import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md" style={{backgroundColor:'green'}}>
    <div className="container-fluid">
        <a href="index.html" class="navbar-brand fs-4 fw-bold"><b className='text-warning'>Auto</b><span className='text-danger'>Bazaar</span></a>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
        </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav gap-3 ms-auto" style={{color:"#6c757d"}}>
            <li className="navbar-item"><a href="/" class="nav-link active">Home</a></li>
            <li className="navbar-item"><a href="/addautomotive" class="nav-link">Add Automotive</a></li>
            <li className="navbar-item"><a href="/signup" class="nav-link">Sign Up</a></li>
            <li className="navbar-item"><a href="/signin" class="nav-link">Sign In</a></li>

        </ul>
      </div>
    </div>

</nav>
  )
}

export default Navbar