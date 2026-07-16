import { useState } from "react";
import LocationInput from "./LocationInput";
import SuggestionList from "./SuggestionList";

const LocationPanel = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState("pickup");
  const [suggestions, setSuggestions] = useState([]);

  return (
    <div className="fixed bottom-0 left-0 w-full max-w-md mx-auto 
      bg-black text-white rounded-t-3xl p-4 shadow-2xl 
      h-[75vh] flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button className="text-xl">←</button>
        <h2 className="text-lg font-semibold">Plan your trip</h2>
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        <LocationInput
          placeholder="Enter pickup location"
          value={pickup}
          setValue={setPickup}
          activeField={activeField}
          setActiveField={setActiveField}
          field="pickup"
          setSuggestions={setSuggestions}
        />

        <LocationInput
          placeholder="Where to?"
          value={destination}
          setValue={setDestination}
          activeField={activeField}
          setActiveField={setActiveField}
          field="destination"
          setSuggestions={setSuggestions}
          
        />
        {/* <button
          onClick={handleSearch}
          className="w-full mt-4 bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition-colors shadow-md"
        >
          Search Rides
        </button> */}
        {/* <button className="bg-white text-black px-4 py-2 rounded-lg mt-3 w-full">
            Find Trip
        </button> */}
      </div>

      {/* Suggestions */}
      <SuggestionList
        suggestions={suggestions}
        pickup={pickup}
        setPickup={setPickup}
        setDestination={setDestination}
        activeField={activeField}
      />
    </div>
  );
};

export default LocationPanel;