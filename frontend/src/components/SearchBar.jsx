// src/components/Categories/SearchBar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchBar = ({ onSearch, currentCategory }) => {
  const [searchData, setSearchData] = useState({
    category: currentCategory === "all" ? "" : currentCategory,
    location: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchData.category) {
      navigate(`/categories/${searchData.category}`);
    }
    onSearch(searchData);
  };

  const handleListItemsClick = () => {
    navigate('/ListItems'); // Navigate to the ListItems page
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="mb-5">
        <Row className="align-items-end">
          <Col md={4}>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={searchData.category}
                onChange={handleChange}
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="appliances">Appliances</option>
                <option value="furniture">Furniture</option>
                <option value="tools">Tools</option>
                <option value="sports">Sports Equipment</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter location"
                value={searchData.location}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Button variant="primary" type="submit" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="text-center mt-3">
        <Button 
          variant="secondary" 
          onClick={handleListItemsClick} 
          className="mb-3"
          style={{
            padding: '12px 24px',
            fontSize: '18px',
            fontWeight: '600',
            borderRadius: '6px',
            backgroundColor: '#007bff',
            color: 'white'
          }}
        >
          List Items
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;