import { useEffect } from "react";
import axios from "axios";

const LocationInput = ({
  placeholder,
  value,
  setValue,
  activeField,
  setActiveField,
  field,
  setSuggestions
}) => {

  useEffect(() => {
    // ⛔ avoid empty calls
    if (!value || value.length < 2) {
      setSuggestions([]);
      return;
    }

    // ✅ debounce (prevents API spam)
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
          }
        );

        // 🔥 IMPORTANT: adjust according to your backend response
        setSuggestions(res.data);

      } catch (err) {
        console.error("Autocomplete error:", err);
      }
    }, 400);

    return () => clearTimeout(timer);

  }, [value]);

  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onFocus={() => setActiveField(field)}
      onChange={(e) => setValue(e.target.value)}
      className={`w-full p-3 rounded-xl bg-gray-900 border 
      ${activeField === field ? "border-white" : "border-gray-700"}
      outline-none`}
    />
  );
};

export default LocationInput;