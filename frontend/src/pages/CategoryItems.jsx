// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const products = [
//   {
//     title: "Carpet Spot cleaner",
//     price: "£11 - £20/day",
//     location: "1.5 mi (Pimlico South)",
//     image: "cleaner.jpeg",
//   },
//   {
//     title: "Vax Spotwash Duo",
//     price: "£8 - £20/day",
//     location: "1.6 mi (Clerkenwell, Islington)",
//     image: "cleaner.jpeg",
//   },
//   {
//     title: "Bissell Spot Clean Pro",
//     price: "£6 - £9/day",
//     location: "1.9 mi (Newington, Southwark)",
//     image: "cleaner.jpeg",
//   },
//   {
//     title: "Hoover Power Scrub Deluxe",
//     price: "£10 - £18/day",
//     location: "2.2 mi (Camden)",
//     image: "cleaner.jpeg",
//   },
//   {
//     title: "Rug Doctor Deep cleaner",
//     price: "£12 - £22/day",
//     location: "1.2 mi (Soho)",
//     image: "cleaner.jpeg",
//   },
//   {
//     title: "Ewbank Cascade Carpet cleaner",
//     price: "£5 - £10/day",
//     location: "2.5 mi (Brixton)",
//     image: "cleaner.jpeg",
//   },
// ];

// const CategoryItems = () => {
//   return (
//     <div style={{ backgroundColor: "#0B1C27", minHeight: "100vh", paddingTop: "4rem", paddingBottom: "4rem" }}>
//       <div className="container text-white">
//         <h1 className="mb-5 text-center">Carpet & Upholstery Cleaners</h1>
//         <div className="row row-cols-1 row-cols-md-3 g-4">
//           {products.map((product, index) => (
//             <div className="col" key={index}>
//               <div className="card h-100 shadow-sm" style={{ borderRadius: "16px" }}>
//                 <img
//                   src={product.image}
//                   className="card-img-top"
//                   alt="Product"
//                   style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px", height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title text-dark">{product.title}</h5>
//                   <p className="card-text text-dark">{product.price}</p>
//                   <p className="text-muted">{product.location}</p>
//                   <a href="/details" className="btn" style={{ backgroundColor: "#F75C4E", color: "#fff", borderRadius: "8px" }}>
//                     View Details
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryItems;


// src/components/Categories/CategoryItems.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const CategoryItems = ({ products = [], category }) => {
  const navigate = useNavigate();

  const handleCardClick = (product) => {
    navigate(`/${category.toLowerCase()}/product-details`, { state: { product } });
  };

  const getBadgeColor = (type) => {
    if (!type) return "#6c757d"; // Default color if type is undefined
    
    switch (type.toLowerCase()) {
      case "exchange":
        return "#F75C4E";
      case "borrow":
        return "#1DA1F2";
      case "request":
        return "#17C964";
      default:
        return "#6c757d";
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-5 text-white">
        <h4>No items found in {category || 'this category'}</h4>
        <p>Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {products.map((product, index) => (
        <div className="col" key={index}>
          <h1>Helllo</h1>
          <div
            className="card h-100 shadow-sm position-relative"
            style={{ borderRadius: "16px", cursor: "pointer" }}
            onClick={() => handleCardClick(product)}
          >
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: getBadgeColor(product.tradeType),
                color: "#fff",
                padding: "0.3rem 0.6rem",
                borderRadius: "5px",
                fontSize: "0.8rem",
                fontWeight: "bold",
                zIndex: 1,
              }}
            >
              {product.tradeType?.toUpperCase() || 'ITEM'}
            </div>
            <img
              src={product.image || 'placeholder.jpg'}
              className="card-img-top"
              alt="Product"
              style={{
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <h5 className="card-title mb-2" style={{color:'#0B1C27'}}>
                {product.title || 'Untitled Item'}
              </h5>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge mb-2" style={{background:'aquamarine',color:'#008000'}}>
                  {product.condition || 'Unknown condition'}
                </span>
                <p className="mb-1" style={{color:'#008000'}}>
                  <i className="bi bi-geo-alt"></i> {product.location || 'Location not specified'}
                </p>
              </div>
              <small style={{color:'InfoText'}}>
                Posted By: {product.postedBy || 'Anonymous'}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryItems;