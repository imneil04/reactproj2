import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../js/firebase";
import { useAuth } from "../context/AuthContext";

const ProfileSection = () => {
  const { user, userData } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  //create state mgt for success message
  const [successMessage, setSuccessMessage] = useState("");

  //form state mgt
  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    favoriteDrink: "",
    address: ""
  });

  // populate form when userData loads
  useEffect(() => {
    if (userData) {
      setFormData({
        displayName: userData.name || "",
        phone: userData.phone || "",
        favoriteDrink: userData.favoriteDrink || "",
        address: userData.address || ""
      });
    }
  }, [userData]);

  // input handler
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // save profile updates
  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        name: formData.displayName,
        phone: formData.phone,
        favoriteDrink: formData.favoriteDrink,
        address: formData.address
      });

      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);

      //auto-hide after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      //console.log("✅ Profile updated");

    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  return (
    
    <div className="bg-white rounded-xl shadow p-6">
      {successMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl animate-pulse">
            <div className="flex items-center gap-2">
                <span>✅</span>
                <span>{successMessage}</span>
            </div>
        </div>
      )}
      
      <h2 className="text-xl font-semibold mb-6">
        Profile Information
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Name */}
        <div>
          <label className="text-sm text-gray-500 block mb-1">
            Full Name
          </label>

          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded-lg px-3 py-2 
              ${!isEditing ? "bg-gray-100" : "bg-white"}
            `}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-500 block mb-1">
            Email
          </label>

          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Address */}
        <div>
          <label className="text-sm text-gray-500 block mb-1">
            Address
          </label>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded-lg px-3 py-2 
              ${!isEditing ? "bg-gray-100" : "bg-white"}
            `}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm text-gray-500 block mb-1">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded-lg px-3 py-2 
              ${!isEditing ? "bg-gray-100" : "bg-white"}
            `}
          />
        </div>

        {/* Favorite Drink */}
        <div>
          <label className="text-sm text-gray-500 block mb-1">
            Favorite Drink
          </label>

          <input
            type="text"
            name="favoriteDrink"
            value={formData.favoriteDrink}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded-lg px-3 py-2 
              ${!isEditing ? "bg-gray-100" : "bg-white"}
            `}
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mt-6">

        {/* Edit */}
        <button
          onClick={() => setIsEditing(true)}
          disabled={isEditing}
          className={`px-4 py-2 rounded-lg text-white transition
            ${isEditing
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"}
          `}
        >
          Edit Info
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={!isEditing}
          className={`px-4 py-2 rounded-lg text-white transition
            ${!isEditing
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          Save Info
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;