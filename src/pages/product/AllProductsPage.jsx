// src/components/ProductUpload.jsx
import BackButton from "../../components/ui/BackButton";
import ProductsList from "./ProductsList";

export default function ProductUploadPage() {
 
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <div className="relative bg-light shadow p-4">
        <BackButton />
        <h1 className="page-subtitle text-center">All Product</h1>
      </div>
      <ProductsList/>
    </div>
  );
}
