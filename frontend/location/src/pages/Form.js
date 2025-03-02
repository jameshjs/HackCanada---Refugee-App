import { useState } from "react";
import './Form.css';


const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    poster: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Successfully submitted!");
      } else {
        console.error("Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Organization Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-2 border rounded" name="name" placeholder="Organization Name" value={formData.name} onChange={handleChange} required />
          <input className="w-full p-2 border rounded" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <input className="w-full p-2 border rounded" type="number" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
          <input className="w-full p-2 border rounded" type="number" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required />
          <input className="w-full p-2 border rounded" name="poster" placeholder="Image URL" value={formData.poster} onChange={handleChange} required />
          <textarea className="w-full p-2 border rounded" name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;