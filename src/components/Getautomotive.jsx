import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Getautomotive = () => {
  const navigate = useNavigate() 
  
  // define state for sorting and filtering 
  const [sortDirection, setSortDirection] = useState("")
  const [searchTerm, setSearchTerm] = useState("")  
  const [sortByField, setSortByField] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Brand")

  // define state for posting data
  const [loading, setLoading] = useState("")
  const [products, setProducts] = useState([])
  const [error, setError] = useState("")

  // define state for "Show More" pagination
  const [visibleCount, setVisibleCount] = useState(8)

  // function for getting products 
  const getproducts = async () => {
    setLoading("Please wait...")
    try {
      const response = await axios.get("https://doreen98.pythonanywhere.com/api/get_automotive")
      setProducts(response.data)
      setLoading("")
    } catch (error) {
      setError(error.message)
      setLoading("")
    }
  }

  useEffect(() => {
    getproducts()
  }, [])

  // map the brands in automotive
  const categories = ["Brand", ...new Set(products.map(p => p.brand))]

  // filter and sort products 
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "Brand" || product.brand === selectedCategory)
    )
    .sort((a, b) => {
      if (!sortByField || !sortDirection) return 0

      let aValue = a[sortByField]
      let bValue = b[sortByField]

      if (sortByField === "price") {
        aValue = parseFloat(aValue)
        bValue = parseFloat(bValue)
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      } else {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }
    })

  // slice products for "show more"
  const currentItems = filteredProducts.slice(0, visibleCount)

  // reset all filters 
  const handleReset = () => {
    setSearchTerm("")
    setSortDirection("")
    setSelectedCategory("Brand")
    setSortByField("")
    setVisibleCount(8)
  }

  // handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setVisibleCount(8)
  }

  const imagepath = 'https://doreen98.pythonanywhere.com/static/images/'

  return (
    <div className='container-fluid'>
      <h4 className="text-info">{loading}</h4>
      <h4 className="text-danger">{error}</h4>

      <h3 className="text-primary text-center my-4">Available Automotives</h3>

      {/* Sorting and filtering */}
      <div className="row p-4">
        <div className="col-md-3">
          <input
            type="text"
            placeholder='Search by name'
            value={searchTerm}
            onChange={handleSearch}
            className='w-100'
            style={{ height: "35px", padding: "10px" }}
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setVisibleCount(8)
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
              setSortByField("price")
              setSortDirection(e.target.value)
              setVisibleCount(8)
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
              const value = e.target.value
              if (value === "az" || value === "za") {
                setSortByField("name")
                setSortDirection(value === "az" ? "asc" : "desc")
              } else {
                setSortByField("")
                setSortDirection("")
              }
              setVisibleCount(8)
            }}
          >
            <option value="">Sort by Name</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-dark w-100 border rounded" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {/* Display products */}
      <div className='row p-4'>
        {currentItems.length === 0 ? (
          <div className="text-center text-muted">No products found.</div>
        ) : (
          currentItems.map((product, index) => (
            <div key={product.id || index} className='col-md-4 d-flex align-items-stretch justify-content-center mb-4'>
              <div className="card h-100 shadow card-margin" style={{ maxWidth: '30rem' }}>
                <img src={imagepath + product.automotive_photo} alt={product.name} className='productimage mt-2' />
                <div className="card-body">
                  <h4 className='text-primary fw-bold'>{product.name}</h4>
                  <h5 className='text-secondary'><span className='fw-semibold'>Brand:</span> {product.brand}</h5>
                  <h5 className='text-muted fst-italic'><span className='fw-semibold'>Compatibility:</span> {product.compartibility}</h5>
                  <h5 className='text-secondary'><span className='fw-semibold'>Warranty:</span> {product.warrant_period}</h5>
                  <h5 className='text-info'><span className='fw-semibold'>Stock Quantity:</span> {product.stock_quantity}</h5>
                  <h4 className='text-success fw-semibold mb-3'>Price: KSH. {product.price}</h4>
                  <button
                    className='btn btn-success w-100 mt-2'
                    onClick={() => navigate("/mpesapayment", { state: { product } })}
                  >
                    Purchase now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Show More / Back to Top */}
      <div className="d-flex justify-content-center mt-4">
        {visibleCount < filteredProducts.length ? (
          <button className="btn btn-outline-primary" onClick={() => setVisibleCount(prev => prev + 8)}>
            Show More
          </button>
        ) : (
          filteredProducts.length > 8 && (
            <button className="btn btn-outline-secondary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Back to Top
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default Getautomotive
