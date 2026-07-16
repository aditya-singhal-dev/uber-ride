import { useNavigate } from "react-router-dom";

const SuggestionList = ({
    suggestions,
    pickup,
    setPickup,
    setDestination,
    activeField
}) => {
    
    const navigate = useNavigate();
const handleSelect = (item) => {
  const value = item.description;

  if (activeField === "pickup") {
    setPickup(value);
  } else {
    setDestination(value);

    navigate("/ride", {
      state: {
        pickup,
        destination: value
      }
    });
  }
};

  return (
    <div className="mt-4 overflow-y-auto flex-1">
      {suggestions.map((item, index) => (
        <div
          key={index}
          onClick={() => handleSelect(item)}
          className="p-3 border-b border-gray-800 cursor-pointer hover:bg-gray-800"
        >
          {item.description || item}
        </div>
      ))}
    </div>
  );
};

export default SuggestionList;