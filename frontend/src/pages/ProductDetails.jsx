import React from 'react';
import { useLocation } from 'react-router-dom';
const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h4 className="text-white">No product selected.</h4>
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
                  <input type="text" className="form-control" value={product.title} readOnly />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-dark">Category</label>
                  <input type="text" className="form-control" value={product.category} readOnly />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-dark">Description</label>
                <textarea className="form-control" rows="4" value={product.description} readOnly />
              </div>

              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="form-label text-dark">Condition</label>
                  <input type="text" className="form-control" value={product.condition} readOnly />
                </div>
                {product.tradeType === "Exchange" && (
                  <div className="col-md-4">
                    <label className="form-label text-dark">Exchange For</label>
                    <input type="text" className="form-control" value={product.exchangeFor} readOnly />
                  </div>
                )}
                <div className="col-md-4">
                  <label className="form-label text-dark">Location</label>
                  <input type="text" className="form-control" value={product.location} readOnly />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label text-dark">Posted By</label>
                  <input type="text" className="form-control" value={product.postedBy} readOnly />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-dark">Contact</label>
                  <input type="text" className="form-control" value={product.contact} readOnly />
                </div>
              </div>

              {product.images && product.images.length > 0 && (
  <div className="mb-4">
    <label className="form-label text-dark">Product Images</label>
    <div className="row">
      {product.images.map((img, idx) => (
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
                  onClick={() => window.history.back()}
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
