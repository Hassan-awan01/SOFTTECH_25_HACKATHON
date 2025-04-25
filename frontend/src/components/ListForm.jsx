import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ListForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    condition: '',
    availability: '',
    exchangeFor: '',
    location: '',
    postedBy: '',
    contact: '',
    images: [],
    tradeType: 'Exchange',
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'images' && files) {
      const fileArray = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: fileArray,
      }));

      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      alert('Please upload at least one image.');
      return;
    }

    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!isSubmitting) return;

    const postData = async () => {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          value.forEach((img) => data.append('images', img));
        } else {
          data.append(key, value);
        }
      });

      try {
        const response = await fetch('YOUR_API_ENDPOINT_HERE', {
          method: 'POST',
          body: data,
        });

        if (!response.ok) {
          throw new Error('Failed to submit listing');
        }

        const result = await response.json();
        console.log('Success:', result);
        navigate('/');
      } catch (err) {
        console.error(err);
        alert('Something went wrong while submitting your listing.');
      } finally {
        setIsSubmitting(false);
      }
    };

    postData();
  }, [isSubmitting]);

  return (
    <div style={{ backgroundColor: "#0B1C27", paddingTop: '70px' }} className="min-vh-100">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-none" style={{ backgroundColor: 'transparent' }}>
              <div className="card-header border-0 px-0 pt-0">
                <h2 className="mb-3 p-3 text-white" style={{
                  backgroundColor: '#28a745',
                  fontWeight: '600',
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  List an Item
                </h2>
              </div>
              <div className="card-body px-0 py-0">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label" style={{ fontWeight: '500', color: '#ffffff' }}>Product Name</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      style={{ border: '1px solid #ced4da', borderRadius: '6px', padding: '10px' }}
                      placeholder="e.g., Bissell SpotClean Pro"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                      <label className="form-label" style={{ fontWeight: '500', color: '#ffffff' }}>Category</label>
                      <select
                        name="category"
                        className="form-select"
                        style={{ border: '1px solid #ced4da', borderRadius: '6px', padding: '10px' }}
                        onChange={handleChange}
                        value={formData.category}
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Medical Equipments">Medical Equipments</option>
                        <option value="Household">Household</option>
                        <option value="Children Items">Children Items</option>
                        <option value="Others">Others</option>
                      </select>
                  </div>


                  <div className="mb-4">
                    <label className="form-label" style={{ fontWeight: '500', color: '#ffffff' }}>Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      style={{ border: '1px solid #ced4da', borderRadius: '6px', padding: '10px' }}
                      placeholder="A powerful portable carpet and upholstery cleaner that easily lifts away spots and stains..."
                      onChange={handleChange}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" style={{ fontWeight: '500', color: '#ffffff' }}>Condition</label>
                    <input
                      type="text"
                      name="condition"
                      className="form-control"
                      style={{ border: '1px solid #ced4da', borderRadius: '6px', padding: '10px' }}
                      placeholder="e.g., Gently Used"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Listing Type */}
                  <div className="mb-4">
                    <label className="form-label" style={{ fontWeight: '500', color: '#ffffff' }}>
                      Listing Type
                    </label>
                    <div>
                      {['Exchange', 'Borrow', 'Request'].map((type) => (
                        <div className="form-check form-check-inline" key={type}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="tradeType"
                            value={type}
                            checked={formData.tradeType === type}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" style={{ color: '#ffffff' }}>
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

            
                  {formData.tradeType === 'Exchange' && (
                    <div className="mb-4">
                      <label className="form-label" style={{ fontWeight: '500', color: '#ffffff' }}>Exchange For</label>
                      <input
                        type="text"
                        name="exchangeFor"
                        className="form-control"
                        style={{ border: '1px solid #ced4da', borderRadius: '6px', padding: '10px' }}
                        placeholder="e.g., Steam Iron or Vacuum Cleaner"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label className="form-label" style={{ fontWeight: '500', color: '#ffffff' }}>Posted By</label>
                      <input
                        type="text"
                        name="postedBy"
                        className="form-control"
                        style={{ border: '1px solid #ced4da', borderRadius: '6px', padding: '10px' }}
                        placeholder="e.g., Alice Johnson"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label className="form-label" style={{ fontWeight: '500', color: '#ffffff' }}>Contact</label>
                      <input
                        type="tel"
                        name="contact"
                        className="form-control"
                        style={{ border: '1px solid #ced4da', borderRadius: '6px', padding: '10px' }}
                        placeholder="+44 7900 123456"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label" style={{ fontWeight: '500', color: '#ffffff' }}>Availability Period</label>
                    <input
                      type="text"
                      name="availability"
                      className="form-control"
                      style={{ border: '1px solid #ced4da', borderRadius: '6px', padding: '10px' }}
                      placeholder="e.g., 1 week, 3 days"
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label" style={{ fontWeight: '500', color: '#ffffff' }}>
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      style={{ border: '1px solid #ced4da', borderRadius: '6px', padding: '10px' }}
                      placeholder="e.g., Manchester, UK"
                      onChange={handleChange}
                      required
                    />
                </div>

                  <div className="mb-4">
                    <label className="form-label" style={{ fontWeight: '500', color: '#ffffff' }}>
                      Product Image <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <div style={{
                      border: imagePreviews.length === 0 ? '2px dashed #28a745' : 'none',
                      borderRadius: '8px',
                      padding: '20px',
                      backgroundColor: imagePreviews.length === 0 ? '#e8f5e9' : 'transparent',
                      textAlign: 'center'
                    }}>
                      <input
                        type="file"
                        name="images"
                        className="form-control"
                        style={{
                          border: 'none',
                          backgroundColor: 'transparent',
                          margin: '0 auto',
                          maxWidth: '300px'
                        }}
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                        required
                      />
                      {imagePreviews.length > 0 ? (
                        <div className="row mt-3">
                          {imagePreviews.map((src, index) => (
                            <div className="col-6 col-md-4 col-lg-3 mb-3" key={index}>
                              <img
                                src={src}
                                alt={`Preview ${index}`}
                                style={{
                                  width: '100%',
                                  height: '100px',
                                  objectFit: 'cover',
                                  borderRadius: '6px',
                                  border: '1px solid #dee2e6'
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ marginTop: '10px', color: '#6c757d' }}>
                          <div style={{ fontSize: '24px' }}>📷</div>
                          <div>No images uploaded</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-grid gap-3 mt-4">
                    <button
                      type="submit"
                      className="btn btn-lg py-2"
                      style={{
                        backgroundColor: '#28a745',
                        borderColor: '#28a745',
                        color: 'white',
                        fontWeight: '600',
                        borderRadius: '6px'
                      }}
                    >
                      Submit Listing
                    </button>
                    <button
                      type="button"
                      className="btn btn-lg py-2"
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #6c757d',
                        color: '#6c757d',
                        fontWeight: '600',
                        borderRadius: '6px'
                      }}
                      onClick={() => navigate('/')}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ListForm;
