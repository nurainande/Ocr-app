import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AppContextProvider";

const ProductsList = () => {
  const {BACKEND_URL} = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/products`, {
  withCredentials: true, // ✅ include cookies/session
  headers: { "Content-Type": "application/json" },
});
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 mt-10">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-xl h-64"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* <h2 className="text-3xl font-bold mb-8 text-center">📦 All Products</h2> */}

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={product.reference_image_url}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-t-2xl"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {product.barcode}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {product.expected_verbage}
                </p>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Ingredients:
                  </h4>
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {product.expected_ingredients?.map((ing, idx) => (
                      <li
                        key={idx}
                        className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                      >
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="mt-5 w-full bg-gradient-to-r from-primary to-primary text-white py-2 rounded-lg font-medium hover:from-primary hover:to-primary transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
