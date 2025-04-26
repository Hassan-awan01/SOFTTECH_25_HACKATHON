import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductDetails = ({ product }) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState(product);

  // Fallback to localStorage if product prop is not provided
  useEffect(() => {
    if (!productData) {
      try {
        const storedProduct = localStorage.getItem('selectedProduct');
        if (storedProduct) {
          setProductData(JSON.parse(storedProduct));
          // Clear localStorage after use
          localStorage.removeItem('selectedProduct');
        }
      } catch (error) {
        console.error('Error retrieving product from localStorage:', error);
      }
    }
  }, [productData]);

  const handleBack = () => {
    navigate('/');
  };

  if (!productData) {
    return (
      <div style={{ backgroundColor: '#0B1C27', minHeight: '100vh', padding: '50px 0' }}>
        <div className="container mt-5 text-center">
          <h4 style={{ color: '#ffffff' }}>No product selected.</h4>
          <button
            className="btn mt-3"
            onClick={handleBack}
            style={{
              backgroundColor: '#00B386',
              color: '#fff',
              border: 'none',
              padding: '12px 30px',
              fontSize: '1.1rem',
              borderRadius: '10px',
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0B1C27', minHeight: '100vh', padding: '50px 0' }}>
      <div className="container">
        <div
          className="card shadow-lg rounded"
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#ccc',
            padding: '30px',
            fontSize: '1.1rem',
            maxWidth: '850px',
            margin: '0 auto',
          }}
        >
          <div
            className="card-header text-white"
            style={{
              backgroundColor: '#003E3E',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              padding: '20px',
              borderRadius: '8px 8px 0 0',
            }}
          >
            Product Details
          </div>

          <div className="card-body mt-4">
            <form>
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label text-dark">Product Name</label>
                  <input type="text" className="form-control" value={productData.title || ''} readOnly />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-dark">Trade Type</label>
                  <input type="text" className="form-control" value={productData.tradeType || 'N/A'} readOnly />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-dark">Description</label>
                <textarea className="form-control" rows="4" value={productData.description || ''} readOnly />
              </div>

              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="form-label text-dark">Condition</label>
                  <input type="text" className="form-control" value={productData.condition || 'N/A'} readOnly />
                </div>
                {productData.tradeType === "Exchange" && (
                  <div className="col-md-4">
                    <label className="form-label text-dark">Exchange For</label>
                    <input type="text" className="form-control" value={productData.exchangeFor || 'N/A'} readOnly />
                  </div>
                )}
                <div className="col-md-4">
                  <label className="form-label text-dark">Location</label>
                  <input type="text" className="form-control" value={productData.location || 'N/A'} readOnly />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label text-dark">Posted By</label>
                  <input type="text" className="form-control" value={productData.postedBy || 'N/A'} readOnly />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-dark">Availability</label>
                  <input type="text" className="form-control" value={productData.availability || 'N/A'} readOnly />
                </div>
              </div>

              {productData.images && productData.images.length > 0 && (
                <div className="mb-4">
                  <label className="form-label text-dark">Product Images</label>
                  <div className="row">
                    {productData.images.map((img, idx) => (
                      <div className="col-md-4 mb-3" key={idx}>
                        <img
                          src={img}
                          alt={`Product ${idx + 1}`}
                          className="img-fluid rounded border"
                          style={{ maxHeight: '250px', objectFit: 'cover', width: '100%' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center">
                <button
                  type="button"
                  className="btn"
                  onClick={handleBack}
                  style={{
                    backgroundColor: '#00B386',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 30px',
                    fontSize: '1.1rem',
                    borderRadius: '10px',
                    marginTop: '10px',
                  }}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;