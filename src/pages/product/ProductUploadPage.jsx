// src/components/ProductUpload.jsx
import BackButton from "../../components/ui/BackButton";
import UploadProductForm from "./UploadProductForm";

export default function ProductUploadPage() {
 
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <div className="relative bg-light shadow p-4">
        <BackButton />
        <h1 className="page-subtitle text-center">Upload Product</h1>
      </div>
      <UploadProductForm/>
      <div>
        {/* view all products page */}
        <div className="text-center p-4">
          <a
            href="/all-products"
            className="text-primary hover:underline"
          >
            View All Products
          </a>
        </div>
      </div>
    </div>
  );
}
