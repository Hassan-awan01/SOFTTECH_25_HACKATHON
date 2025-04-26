import { useEffect, useState } from 'react';
import ListForm from '../components/ListForm';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  return <div><ListForm /></div>;
}

export default ProductListing;