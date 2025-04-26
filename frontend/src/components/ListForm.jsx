import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ListForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    condition: "",
    availability: "",
    exchangeFor: "",
    location: "",
    postedBy: "",
    contact: "",
    images: [],
    tradeType: "Exchange",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "electronics",
    "furniture",
    "clothing",
    "medical equipments",
    "household",
    "children items",
    "others",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images" && files) {
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
        [name]: name === "category" ? value.toLowerCase() : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!isSubmitting) return;

    const postData = async () => {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((img) => data.append("images", img));
        } else {
          data.append(key, value);
        }
      });
      const authToken = localStorage.getItem("authToken");
      console.log(`Auth Token: ${authToken}`);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/items",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log("Success:", response.data);
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
        alert(
          error?.response?.data?.message ||
            "Something went wrong while submitting your listing."
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    postData();
  }, [isSubmitting]);

  return (
    <div
      style={{ backgroundColor: "#0B1C27", paddingTop: "70px" }}
      className="min-vh-100"
    >
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="card border-0 shadow-none"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="card-header border-0 px-0 pt-0">
                <h2
                  className="mb-3 p-3 text-white"
                  style={{
                    backgroundColor: "#28a745",
                    fontWeight: "600",
                    borderRadius: "6px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  List an Item
                </h2>
              </div>

              <div className="card-body px-0 py-0">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="form-label"
                      style={{ color: "#fff", fontWeight: "500" }}
                    >
                      Product Name
                    </label>
                    <input
                      name="title"
                      className="form-control"
                      placeholder="e.g., Bissell SpotClean Pro"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="form-label"
                      style={{ color: "#fff", fontWeight: "500" }}
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      className="form-select"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      className="form-label"
                      style={{ color: "#fff", fontWeight: "500" }}
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      className="form-control"
                      placeholder="Describe the product..."
                      rows={3}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="form-label"
                      style={{ color: "#fff", fontWeight: "500" }}
                    >
                      Condition
                    </label>
                    <input
                      name="condition"
                      className="form-control"
                      placeholder="e.g., Like New"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Trade Type */}
                  <div className="mb-4">
                    <label
                      className="form-label"
                      style={{ color: "#fff", fontWeight: "500" }}
                    >
                      Listing Type
                    </label>
                    <div>
                      {["Exchange", "Borrow", "Request"].map((type) => (
                        <div
                          className="form-check form-check-inline"
                          key={type}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="tradeType"
                            value={type}
                            checked={formData.tradeType === type}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            style={{ color: "#fff" }}
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {formData.tradeType === "Exchange" && (
                    <div className="mb-4">
                      <label
                        className="form-label"
                        style={{ color: "#fff", fontWeight: "500" }}
                      >
                        Exchange For
                      </label>
                      <input
                        name="exchangeFor"
                        className="form-control"
                        placeholder="e.g., Steam Iron"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      className="form-label"
                      style={{ color: "#fff", fontWeight: "500" }}
                    >
                      Posted By
                    </label>
                    <input
                      name="postedBy"
                      className="form-control"
                      placeholder="Your Name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="form-label"
                      style={{ color: "#fff", fontWeight: "500" }}
                    >
                      Contact
                    </label>
                    <input
                      name="contact"
                      className="form-control"
                      placeholder="e.g., +44 7000 123456"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="form-label"
                      style={{ color: "#fff", fontWeight: "500" }}
                    >
                      Availability Period
                    </label>
                    <input
                      name="availability"
                      className="form-control"
                      placeholder="e.g., 1 week"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="form-label"
                      style={{ color: "#fff", fontWeight: "500" }}
                    >
                      Location
                    </label>
                    <input
                      name="location"
                      className="form-control"
                      placeholder="e.g., London, UK"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="form-label"
                      style={{ color: "#fff", fontWeight: "500" }}
                    >
                      Product Images
                    </label>
                    <input
                      type="file"
                      name="images"
                      className="form-control"
                      accept="image/*"
                      multiple
                      onChange={handleChange}
                      required
                    />
                    {imagePreviews.length > 0 && (
                      <div className="row mt-3">
                        {imagePreviews.map((src, i) => (
                          <div className="col-4 mb-3" key={i}>
                            <img
                              src={src}
                              alt="Preview"
                              className="img-fluid rounded"
                              style={{ height: "100px", objectFit: "cover" }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="d-grid gap-3 mt-4">
                    <button
                      type="submit"
                      onSubmit={handleSubmit}
                      disabled={isSubmitting}
                      className="btn btn-lg"
                      style={{
                        backgroundColor: "#28a745",
                        color: "#fff",
                        fontWeight: "600",
                      }}
                    >
                      Submit Listing
                    </button>
                    <button
                      type="button"
                      className="btn btn-lg btn-outline-light"
                      onClick={() => navigate("/")}
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
