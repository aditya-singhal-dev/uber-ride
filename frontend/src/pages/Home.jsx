import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ClockIcon,
  CalendarIcon,
  HomeIcon,
  Squares2X2Icon,
  BookmarkIcon,
  UserIcon,
  MapPinIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/outline";
import 'remixicon/fonts/remixicon.css';

const services = [
  { name: "Trip", img: "/trip.png", tag: "Instant" },
  { name: "Bike", img: "/bike.png" , tag:"saver"},
  { name: "Auto", img: "/auto.png" },
  { name: "Rentals", img: "/rentals.png" ,tag:"effortless"},
//   { name: "Bus tickets", img: "/bus.png", tag: "Promo" },
//   { name: "Intercity", img: "/intercity.png", tag: "5%" },
//   { name: "Metro", img: "/metro.png", tag: "Promo" },
//   { name: "Schedule", img: "/schedule.png" }
];


const Home = () => {
const navigate = useNavigate();
const [showNav, setShowNav] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // scrolling down
      setShowNav(false);
    } else {
      // scrolling up
      setShowNav(true);
    }
    setLastScrollY(window.scrollY);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    if (!destination) return;

    navigate("/ride", {
      state: {
        pickup,
        destination,
      },
    });
  };
  return (
    <div className="bg-[#f5f5f5] min-h-screen flex flex-col justify-between">

      {/* 🔝 Header */}
      <div className="px-5 pt-6">
        <h1 className="text-3xl font-bold text-center">RideX</h1>
        {/* 🔍 Search */}
        {/* <div className="mt-5 flex items-center bg-white rounded-full px-4 py-3 shadow-sm"> */}
        {/* <i class="ri-user-location-fill ri-lg h-5 flex items-center"></i> */}

          {/* <input
            type="text"
            placeholder="Enter pickup"
            value={pickup}
          onChange={(e) => setPickup(e.target.value)}
            className="ml-3 flex-1 outline-none bg-transparent"
          /> */}
            
          
        {/* </div> */}
        <div className="mt-5 flex items-center bg-white rounded-full px-4 py-3 shadow-sm">
        <i class="ri-map-pin-2-fill ri-lg h-5 flex items-center"></i>
          <input
            type="text"
            placeholder="Where to?"
        //     value={destination}
        //   onChange={(e) => setDestination(e.target.value)}
            onFocus={() => navigate("/locationpanel")}
            className="ml-3 flex-1 outline-none bg-transparent"
          /> 
          {/* <Link to="/LoactionPanel" className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm">
            <i class="ri-search-line ri-lg h-5 flex items-center"></i>
            
          </Link> */}
          
        </div>

        {/* 📍 Recent Locations */}
        <div className="bg-white rounded-2xl mt-4 p-4 shadow-sm">
            <div className="flex items-start py-2 border-b font-bold "><p className="text-xl">Popular Destinations</p></div>
          <div className="flex items-start gap-3 py-2 border-b">
            <MapPinIcon className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="font-semibold">
                Jaypee Institute of Information Technology
              </p>
              <p className="text-sm text-gray-500">
                G998+WRV, Jaypee Greens, Noida
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 py-2">
            <MapPinIcon className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="font-semibold">Hazrat Nizamuddin Railway Station</p>
              <p className="text-sm text-gray-500">
                Station Road, Nizamuddin East, New Delhi
              </p>
            </div>
          </div>
        </div>

        {/* 🚗 Services */}
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">For you</h2>
            <span className="text-xl">→</span>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4 ">
            {services.map((item, i) => (
              <div key={i} className="text-center relative">
                
                {/* Tag */}
                {item.tag && (
                  <span className="absolute top-0 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-lg">
                    {item.tag}
                  </span>
                )}

                <div className="bg-white rounded-full p-4 shadow-sm flex justify-center">
                  <img src={item.img} alt="" className="w-10 h-10" />
                </div>

                <p className="text-sm mt-2">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🌍 Outstation */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">
            Outstation getaways
          </h2>

          <div className="flex gap-4 overflow-x-auto">
            {[
              { name: "Jaipur",img: "/Jaipur.png" },
              { name: "Varanasi",img: "/Varanasi.png" },
              { name: "Agra",img: "/Agra.png" },
              { name: "Rishikesh",img: "/Rishikesh.png" },
              { name: "Delhi",img: "/Delhi.png" },
            ].map((place, i) => (
              <div
                key={i}
                className="min-w-[200px] bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  src={place.img}
                  className="h-28 w-full object-cover"
                />
                <div className="p-3">
                  <p className="font-semibold">{place.name}</p>
                  {/* <p className="text-green-600 text-sm">
                    From {place.price}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔻 Bottom Navbar */}
      <div
  className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md 
  bg-white/80 backdrop-blur-md rounded-2xl shadow-md px-6 py-3 
  flex justify-between items-center z-50 
  transition-all duration-300 
  ${showNav ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
>
        <div className="flex flex-col items-center text-black">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </div>

        <div className="flex flex-col items-center text-gray-500">
            <Link to="/sos">
            <img src="sos.png" alt="sos" className="w-6 h-6 mt-1"/>
          <span className="text-xs">SOS</span>
          </Link>
        </div>

        <div className="flex flex-col items-center text-gray-500">
          <BookmarkIcon className="w-6 h-6" />
          <span className="text-xs">Activity</span>
        </div>

        <div className="flex flex-col items-center text-gray-500">
            <Link to="/account">
          <UserIcon className="w-6 h-6" />
          <span className="text-xs">Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;