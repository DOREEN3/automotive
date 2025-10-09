import React from 'react'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-md" style={{backgroundColor:'green'}}>
    <div class="container-fluid">
        <a href="index.html" class="navbar-brand fs-4 fw-bold"><b className='text-warning'>Auto</b><span className='text-danger'>Bazaar</span></a>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav gap-3 ms-auto">
            <li class="navbar-item"><a href="/" class="nav-link active">Home</a></li>
            <li class="navbar-item"><a href="/addautomotive" class="nav-link">Add Automotive</a></li>
            <li class="navbar-item"><a href="/signup" class="nav-link">Sign Up</a></li>
            <li class="navbar-item"><a href="/signin" class="nav-link">Sign In</a></li>

        </ul>
      </div>
    </div>

</nav>
  )
}

export default Navbar