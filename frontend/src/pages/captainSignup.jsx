import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import axios from 'axios';
import CaptainDataContext from '../context/CaptainDataContext';

export const CaptainSignup = () => {
  const navigate = useNavigate();
  const [, setCaptain ] = useContext(CaptainDataContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [vehicle, setVehicle] = useState({
  color: '',
  plate: '',
  capacity: '',
  vehicleType: ''
});

console.log(useContext(CaptainDataContext));
  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    try{
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: LastName
      },
      email: email,
      password: password,
      vehicle: {
  ...vehicle,
  capacity: Number(vehicle.capacity),
  plate: vehicle.plate.toUpperCase().trim()
}
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')

       // reset
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setVehicle('');
    }
    }catch(err){
        setError(err.response?.data?.message || "Please fill in all fields.");
    }
  }
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    
      <motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="min-h-screen flex relative overflow-hidden"
>
{/* Background */}
<motion.div
initial={{ opacity: 0, scale: 1.05 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6 }}
className="absolute inset-0 bg-contain bg-center"
style={{ backgroundImage: "url('/doodle-bg.png')" }}
/>


  {/* Overlay */}
  <div className="absolute inset-0 bg-white/60 "></div>

  {/* Left Side */}
  <div className="w-full lg:w-1/2 flex flex-col px-8 lg:px-16 pt-12 relative z-10">
    
    {/* Header */}
    <div className="flex items-center justify-between mb-0">
      <button
        onClick={() => navigate(-1)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        <ArrowLeftIcon className="w-5 h-5 text-black" />
      </button>

      {/* <h1
        onClick={() => navigate("/")}
        className="text-3xl font-extrabold cursor-pointer"
      >
        RideX
      </h1> */}
      <img src="/ridex-captain.png" alt="RideX Captain" className='h-25 cursor-pointer' onClick={() => navigate("/")} />
    </div>

    {/* Form */}
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-wd-md"
    >
      <motion.h2 variants={item} className="text-3xl font-semibold mb-2">
        Create a Captain Account
      </motion.h2>

      <form onSubmit={submitHandler} className="space-y-1">

        {/* Name */}
        <motion.div variants={item}>
          <p className="text-sm text-gray-600 mb-1">Full name</p>
          <div className="flex gap-3">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First name"
              className="w-1/2 bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 focus:ring-black outline-none"
            />
            <input
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last name"
              className="w-1/2 bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 focus:ring-black outline-none"
            />
          </div>
        </motion.div>

        {/* Email */}
        <motion.div variants={item}>
          <p className="text-sm text-gray-600 mb-1">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@example.com"
            className="w-full bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 focus:ring-black outline-none"
          />
        </motion.div>

        {/* Password */}
        <motion.div variants={item}>
          <p className="text-sm text-gray-600 mb-2">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            className="w-full bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 focus:ring-black outline-none"
          />
        </motion.div>

        {/* Confirm Password */}
        <motion.div variants={item}>
          <p className="text-sm text-gray-600 mb-2">Confirm Password</p>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm password"
            className={`w-full bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 outline-none ${
              error && confirmPassword
                ? 'border-red-500 focus:ring-red-500'
                : 'focus:ring-black'
            }`}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </motion.div>
          {/* Vehicle Info */}
<motion.div variants={item}>
  <p className="text-sm text-gray-600 mb-2">Vehicle Information</p>

  <div className="space-y-3">

    {/* Color */}
    <input
      value={vehicle.color}
      onChange={(e) =>
        setVehicle({ ...vehicle, color: e.target.value })
      }
      type="text"
      placeholder="Vehicle Color"
      className="w-full bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 focus:ring-black outline-none"
    />

    {/* Plate */}
    <input
      value={vehicle.plate}
      onChange={(e) =>
        setVehicle({ ...vehicle, plate: e.target.value })
      }
      type="text"
      placeholder="Vehicle Plate Number"
      className="w-full bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 focus:ring-black outline-none"
    />

    {/* Capacity + Type */}
    <div className="flex gap-3">

      {/* Capacity */}
      <input
        value={vehicle.capacity}
        onChange={(e) =>
          setVehicle({ ...vehicle, capacity: e.target.value })
        }
        type="number"
        placeholder="Capacity"
        className="w-1/2 bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 focus:ring-black outline-none"
      />

      {/* Vehicle Type */}
      <select
        value={vehicle.vehicleType}
        onChange={(e) =>
          setVehicle({ ...vehicle, vehicleType: e.target.value })
        }
        className="w-1/2 bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 focus:ring-black outline-none"
      >
        <option value="">Select Type</option>
        <option value="car">Car</option>
        <option value="bike">Bike</option>
        <option value="autorikshaw">Auto Rikshaw</option>
      </select>

    </div>
  </div>
</motion.div>
        {/* Button */}
        <motion.button
          variants={item}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={password !== confirmPassword && confirmPassword !== ''}
          className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          Create Captain Account
        </motion.button>

        {/* Footer */}
        <motion.p variants={item} className="text-sm text-gray-600">
          Already have a Captain account?{" "}
          <Link to="/login" className="underline font-medium">
            Sign in
          </Link>
        </motion.p>

      </form>
    </motion.div>
  </div>

  {/* Right Side */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="hidden lg:flex w-1/2 items-center justify-center relative z-10"
  >
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-center px-10"
    >
      <h2 className="text-4xl font-bold mb-4">
        Ride smarter with RideX
      </h2>
      <p className="text-lg text-gray-700">
        Fast rides, reliable drivers, seamless experience.
      </p>
    </motion.div>
  </motion.div>
</motion.div>
  );
};

export default CaptainSignup;