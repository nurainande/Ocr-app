const url = `https://api.cloudinary.com/v1_1/dtbmyj4ng/image/upload`

const uploadImage  = async(image) => {
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","mern_product")
    console.log(formData)
    

    const dataResponse = await fetch(url,{
        method : "post",
        body : formData
    })

    return dataResponse.json()

}

import axios from "axios";
import React, { useState } from "react";
import { useAppContext } from "../../context/AppContextProvider"

const UploadProductForm = () => {
  const {BACKEND_URL} = useAppContext();
  const [form, setForm] = useState({
    name: "",
    barcode: "",
    expected_verbage: "",
    expected_ingredients: [""],
    reference_image_url: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Generic input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image separately
  // const handleImageChange = (e) => {
  //   setForm((prev) => ({ ...prev, reference_image: e.target.files[0] }));
  // };
  // handleUploadImage
  // ============DANGER ZONE=================
const handleUploadImage = (e) => {
  console.log(e)
    const file = e.target.files[0];
    
    uploadImage(file).then(data=>{
  console.log(data.secure_url)
  if (data.secure_url) {
        setForm((prevForm) => {
          const updatedForm = { ...prevForm, reference_image_url: data.secure_url };
          console.log("Updated Form State:", updatedForm); // Correctly logs the updated state
          return updatedForm;
        })
      }
}).catch(error=>{
  console.log(error)
})
    
}

  // Ingredient change
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...form.expected_ingredients];
    newIngredients[index] = value;
    setForm((prev) => ({ ...prev, expected_ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setForm((prev) => ({
      ...prev,
      expected_ingredients: [...prev.expected_ingredients, ""],
    }));
  };

  const removeIngredient = (index) => {
    setForm((prev) => ({
      ...prev,
      expected_ingredients: prev.expected_ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!form.reference_image_url) {
      setMessage("Please upload a reference image.");
      setLoading(false);
      return;
    }


    try {
      await axios.post(`${BACKEND_URL}/products`,
        form,
        {
          headers: { "Content-Type": "application/json" },withCredentials: true, // ✅ sends cookies along with the request
  }
);

      setMessage("✅ Product uploaded successfully!");
      // Reset form
      setForm({
        name: "",
        barcode: "",
        expected_verbage: "",
        expected_ingredients: [""],
        reference_image_url: null,
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Error uploading product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="barcode"
          placeholder="Barcode"
          value={form.barcode}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="expected_verbage"
          placeholder="Expected Verbage"
          value={form.expected_verbage}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div>
          <label className="block font-semibold mb-2">Ingredients</label>
          {form.expected_ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-1 border p-2 rounded"
                placeholder={`Ingredient ${index + 1}`}
                required
              />
              {form.expected_ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="bg-error text-white px-3 rounded"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Add Ingredient
          </button>
        </div>

        <div>
          <label className="block font-semibold mb-2">Reference Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadImage}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary transition"
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>

        {message && <p className="mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default UploadProductForm;
