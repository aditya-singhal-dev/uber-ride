import { useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BookmarkIcon,
  UserIcon
} from "@heroicons/react/24/outline";

const SosPage = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [locationLink, setLocationLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [showOptions, setShowOptions] = useState(false); // ✅ FIXED

  // 🔽 Navbar scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
  navigator.permissions.query({ name: "geolocation" }).then((result) => {
    console.log(result.state);
  });
}, []);

const handleSOSClick = async () => {
  setLoading(true);

  let locationText = "Location not available";

  try {
    const loc = await getLocation();
    locationText = `https://maps.google.com/?q=${loc.lat},${loc.lng}`;
  } catch (err) {
  console.log("Location error:", err);
  setLocationError(err);   // 👈 show real reason
}

  setLocationLink(locationText);
  setLoading(false);
  setShowOptions(true);
};

  // 🔽 Helper: Get location
  const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported");
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(error.message);
      }
    );
  });
};

  // 🔴 CALL
  const handleCall = () => {
    window.location.href = "tel:112";
  };

  const sendSMS = (location) => {
  const phone = "917428770166";
  const message = `SOS! I need help. Location: ${location}`;

  window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
};

const sendWhatsApp = (location) => {
  const phone = "917428770166";
  const message = `🚨 SOS! I need help. Location: ${location}`;

  window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

  return (
    <div className="bg-[#f5f5f5] min-h-screen flex flex-col justify-between items-center px-4">

      {/* Title */}
      <h1 className="text-3xl font-bold mt-10 text-red-500">Emergency SOS</h1>

      {/* Description */}
      <p className="text-center text-gray-600 mt-3">
        Press the button below to alert emergency services and share your location.
      </p>

      {/* SOS Button */}
      <button
  onClick={handleSOSClick}
  className="w-40 h-40 mt-10 mb-50 rounded-full flex items-center justify-center text-xl font-bold shadow-lg bg-red-600 text-white active:scale-95"
>
  {loading ? "Getting Location..." : "SOS"}
</button>

      {/* Error */}
      {locationError && (
        <p className="text-red-400 mt-4">{locationError}</p>
      )}

      {/* 🔴 OPTIONS MODAL */}
      {showOptions && (
        <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-50">
          <div className="bg-white w-full p-6 rounded-t-2xl space-y-4">

            <h2 className="text-lg font-bold text-center">Choose Action</h2>

            <button
              onClick={() => {
                handleCall();
                setShowOptions(false);
              }}
              className="w-full bg-red-600 text-white py-3 rounded-lg"
            >
              📞 Call Emergency
            </button>

            <button
  onClick={() => {
    sendSMS(locationLink);
    setShowOptions(false);
  }}
>
  📩 Send SMS
</button>

<button
  onClick={() => {
    sendWhatsApp(locationLink);
    setShowOptions(false);
  }}
>
  💬 WhatsApp
</button>

            <button
              onClick={() => setShowOptions(false)}
              className="w-full text-gray-500"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* 🔻 Bottom Navbar */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md 
        bg-white/80 backdrop-blur-md rounded-2xl shadow-md px-6 py-3 
        flex justify-between items-center z-50 
        transition-all duration-300 
        ${showNav ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
      >
        <div className="flex flex-col items-center text-black">
          <Link to="/home">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">Home</span>
          </Link>
        </div>

        <div className="flex flex-col items-center text-gray-500">
          <Link to="/sos">
            <img src="sos.png" alt="sos" className="w-6 h-6 mt-1" />
            <span className="text-xs">SOS</span>
          </Link>
        </div>

        <div className="flex flex-col items-center text-gray-500">
          <BookmarkIcon className="w-6 h-6" />
          <span className="text-xs">Activity</span>
        </div>

        <div className="flex flex-col items-center text-gray-500">
          <UserIcon className="w-6 h-6" />
          <span className="text-xs">Account</span>
        </div>
      </div>
    </div>
  );
};

export default SosPage;