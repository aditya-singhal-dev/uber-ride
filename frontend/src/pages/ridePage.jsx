import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useJsApiLoader, GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";
import 'remixicon/fonts/remixicon.css';
import axios from 'axios';

const directionsRendererOptions = {
  polylineOptions: {
    strokeColor: '#000000',
    strokeWeight: 5,
    strokeOpacity: 1,
  },
  suppressMarkers: true,
};

export default function RidePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const [directions, setDirections] = useState(null);
  const [distanceData, setDistanceData] = useState(null);
  const [selected, setSelected] = useState(1);
  const [fare, setFare] = useState({});
  const [pickupState, setPickupState] = useState("");
  const [destinationState, setDestinationState] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API
  });

  // 📍 Load pickup/destination
  useEffect(() => {
    if (location.state) {
      setPickupState(location.state.pickup || "");
      setDestinationState(location.state.destination || "");
    }
  }, [location.state]);

  // 📏 Distance API
  useEffect(() => {
    if (!pickupState || !destinationState) return;

    axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`, {
      params: { origin: pickupState, destination: destinationState },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => setDistanceData(res.data))
      .catch(err => console.error(err));
  }, [pickupState, destinationState]);

  // 🗺️ Directions API
  useEffect(() => {
    if (!isLoaded || !pickupState || !destinationState) return;

    const service = new window.google.maps.DirectionsService();

    service.route(
      {
        origin: pickupState,
        destination: destinationState,
        travelMode: "DRIVING"
      },
      (result, status) => {
        if (status === "OK") setDirections(result);
      }
    );
  }, [isLoaded, pickupState, destinationState]);

  const routeLeg = directions?.routes?.[0]?.legs?.[0];

  // 🎯 Marker icon
  const markerIcon = useMemo(() => {
    if (!isLoaded || !window.google) return undefined;

    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 9,
      fillColor: '#000000',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 2,
    };
  }, [isLoaded]);

  // 🔥 IMPORTANT: Memoized DirectionsRenderer
  const MemoDirections = useMemo(() => {
    if (!directions) return null;

    return (
      <DirectionsRenderer
        directions={directions}
        options={directionsRendererOptions}
      />
    );
  }, [directions]);

  // 📍 Fit bounds
  useEffect(() => {
    if (!directions || !mapRef.current || !window.google) return;

    const bounds = new window.google.maps.LatLngBounds();

    routeLeg?.steps?.forEach((step) => {
      bounds.extend(step.start_location);
      bounds.extend(step.end_location);
    });

    if (!bounds.isEmpty()) {
      mapRef.current.fitBounds(bounds, {
        top: 80,
        bottom: 320,
        left: 48,
        right: 48
      });
    }
  }, [directions, routeLeg]);

  // 💰 Fare API
  useEffect(() => {
    if (!pickupState || !destinationState) return;

    axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup: pickupState, destination: destinationState },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => setFare(res.data))
      .catch(err => console.error(err));
  }, [pickupState, destinationState]);

  const formatPrice = (amount) => (amount ? `₹${amount}` : "--");

  const rides = useMemo(() => [
    {
      id: 1,
      name: "RideX economy",
      time: distanceData?.duration?.text || "8 min",
      price: formatPrice(fare.car),
      img: "trip.png",
      tag: "Good Deal"
    },
    {
      id: 2,
      name: "Moto Saver",
      time: distanceData?.duration?.text || "6 min",
      price: formatPrice(fare.moto),
      img: "bike.png",
      tag: "Saver"
    },
    {
      id: 3,
      name: "Auto",
      time: distanceData?.duration?.text || "7 min",
      price: formatPrice(fare.auto),
      img: "auto.png"
    }
  ], [fare, distanceData]);

  // 🚀 Memoized Map (prevents re-render on ride click)
  const MapComponent = useMemo(() => {
    if (!isLoaded) return null;

    return (
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={{ lat: 28.6139, lng: 77.2090 }}
        zoom={12}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {MemoDirections}

        {routeLeg?.start_location && markerIcon && (
          <Marker
            position={routeLeg.start_location}
            icon={markerIcon}
            label={{ text: 'P', color: '#ffffff', fontWeight: 'bold' }}
            title={pickupState}
          />
        )}

        {routeLeg?.end_location && markerIcon && (
          <Marker
            position={routeLeg.end_location}
            icon={markerIcon}
            label={{ text: 'D', color: '#ffffff', fontWeight: 'bold' }}
            title={destinationState}
          />
        )}
      </GoogleMap>
    );
  }, [isLoaded, MemoDirections, routeLeg, markerIcon, pickupState, destinationState]);

  // Bottom sheet animation
  const y = useMotionValue(300);
  const opacity = useTransform(y, [0, 300], [1, 0.9]);

  return (
    <div className="h-screen w-full relative overflow-hidden">

      {/* MAP */}
      <div className="h-full w-full">
        {MapComponent}
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 bg-white shadow-md p-3 rounded-full z-10"
      >
        ←
      </button>

      {/* BOTTOM SHEET */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 400 }}
        style={{ y, opacity }}
        className="absolute bottom-0 w-full bg-white rounded-t-3xl p-4 shadow-xl"
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />

        <p className="text-center text-gray-500 mb-3">Choose Ride</p>

        <div className="max-h-[300px] overflow-y-auto">
          {rides.map((ride) => (
            <div
              key={ride.id}
              onClick={() => setSelected(ride.id)}
              className={`flex items-center justify-between p-3 rounded-xl mb-2 cursor-pointer transition ${
                selected === ride.id
                  ? "border-2 border-black bg-white"
                  : "bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <img src={ride.img} className="w-16 h-16" />

                <div>
                  <h3 className="font-semibold text-lg">{ride.name}</h3>

                  {ride.tag && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-2xl">
                      <i className="ri-flashlight-fill"></i> {ride.tag}
                    </span>
                  )}

                  <p className="text-gray-500 text-sm">{ride.time}</p>
                </div>
              </div>

              <span className="font-semibold">
                <i className="ri-price-tag-3-fill"></i> {ride.price}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 bg-black text-white py-3 rounded-xl text-lg font-semibold">
          Choose Ride
        </button>
      </motion.div>
    </div>
  );
}