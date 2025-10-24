import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Getautomotive = () => {
  let navigate=useNavigate() 
  
// define state for sorting and filtering 
  const[sortDirection,setSortDirection]=useState("")
  const[searchTerm,setSearchTerm]=useState("")  
  const [sortByField,setSortByField]=useState("")
  const [selectedCategory,setSelectedCategory]=useState("Brand")

// define state for posting data
  const [loading, setLoading] = useState("")
  const [products, setProducts] = useState([])
  const [error, setError] = useState("")

  // define states for Pagination 
  const [currentPage,setCurrentPage]=useState(1)
  const [itemsPerPage,setItemsPerPage]=useState(8)

  // function for getting products 
  const getproducts = async () => {
    setLoading("Please wait...")
    try {
      const response = await axios.get("https://doreen98.pythonanywhere.com/api/get_automotive")
      setProducts(response.data)
      // reset loading 
      setLoading("")
    } catch (error) {
      setError(error.message)
      // reset loading 
      setLoading("")
    }
  }

  useEffect(() => {
    getproducts()
  }, [])

  // map the brands in automotive
  const categories=["Brand",...new Set(products.map(p=>p.brand))];

//  define function to filter and sort products 
  const filteredProducts = products
  .filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "Brand" || product.brand === selectedCategory)
  )
  .sort((a, b) => {
    if (!sortByField || !sortDirection) return 0;
  
    let aValue = a[sortByField];
    let bValue = b[sortByField];
  
    // Convert price strings to numbers 
    if (sortByField === "price") {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }
  
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === "asc"
        ? aValue - bValue
        : bValue - aValue;
    }
  });
  

  // pagination calculation 
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstPage = indexOfLastItem - itemsPerPage
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const currentItems=filteredProducts.slice(indexOfFirstPage,indexOfLastItem)

  // handle page change 
  const handlePageChange=(pageNumber)=>{
    setCurrentPage(pageNumber)
  }


  
  // reset all filter 
  const handleReset=()=>{
    setSearchTerm("")
    setSortDirection("")
    setSelectedCategory("Brand")
    setSortByField("")
  }

  // reset pagination current page to 1 whenever search

  const handleSearch=(e)=>{
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const imagepath = 'https://doreen98.pythonanywhere.com/static/images/'

  return (
    <div className='container-fluid'>
       <h4 className="text-info">{loading}</h4>
      <h4 className="text-danger">{error}</h4>

      <h3 className="text-primary text-center my-4">Available Automotives</h3>

      {/* sorting and filtering   */}

      <div className="row p-4">
        <div className="col-md-3">
          <input type="text" placeholder='Search by name' value={searchTerm}
          onChange={handleSearch}
          className='w-100' style={{height:"35px",padding:"10px"}}/>
        </div>
       
          <div className="col-md-2">
              <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setCurrentPage(1)
              }}
             >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
        <select
            className="form-select"
            value={sortDirection}
            onChange={(e) => {
              setSortByField("price");
              setSortDirection(e.target.value);
              setCurrentPage(1)
            }}
          >
            <option value="">Price</option>
            <option value="desc">Highest Price</option>
            <option value="asc">Lowest Price</option>
          </select>

        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "az" || value === "za") {
                setSortByField("name");
                setSortDirection(value === "az" ? "asc" : "desc");
                setCurrentPage(1)
              } else {
                setSortByField("price");
                setSortDirection(""); // Default to no sorting
              }
            }}
          >
            <option value="">Sort by Name</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>
        </div>


        <div className="col-md-2">
          <button className="btn btn-dark w-100 border rounded" onClick={handleReset}>Reset</button>
        </div>

      </div>
    

        {/* filter and map the products  */}
      <div className='row p-4'>
      {currentItems.length === 0 ? (
          <div className="text-center text-muted">No products found.</div>
        ) : (
          currentItems.map((product, index) => (
          <div key={product.id || index} className='col-md-4 d-flex align-items-stretch justify-content-center mb-4'>
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
        ))
      )}
      </div>


      {/* pagination  */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            {Array.from({length : totalPages},(_ , index)=>(
              <li key={index}
              className={`page-item ${currentPage ===  index + 1 ? "active" : ""}` }>
                <button className='page-link' onClick={()=>handlePageChange(index + 1)}>
                    {index + 1}
                </button>

              </li>

            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Getautomotive
