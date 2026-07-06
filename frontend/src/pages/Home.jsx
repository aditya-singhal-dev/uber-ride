import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen flex flex-col bg-white relative">

      {/* 🔹 Top Left Logo */}
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-4xl font-bold text-black tracking-wide">
          RideX
        </h1>
      </div>

      {/* 🔹 Image Section */}
      <div className="flex-1 relative">
        <img
          src="/uber-style.jpg"
          alt="Ride"
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div> */}
      </div>

      {/* 🔹 Bottom Section */}
      <div className="bg-white px-6 pt-6 pb-8 rounded-t-3xl shadow-md">
        
        <h1 className="text-3xl font-bold text-black leading-tight">
          Get started with RideX
        </h1>

        <Link to="/login" className="mt-6 w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-2 text-lg font-semibold hover:bg-gray-900 transition">
          Continue
          <span className="text-xl">→</span>
        </Link>

      </div>
    </div>

  );
};

export default Home;