import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import axios from 'axios'
import CaptainDataContext from '../context/CaptainDataContext';

const CaptainLogin = () => {
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const navigate = useNavigate();
const [,setCaptain] = useContext(CaptainDataContext)

const submitHandler = async (e) => {
e.preventDefault();
console.log({ email, password });

const captain = {
  email:email,
  password
}
const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

if (response.status === 200) {
      const data = response.data

      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')

    }
setEmail('');
setPassword('');
};

const item = {
hidden: { opacity: 0, y: 20 },
show: { opacity: 1, y: 0 }
};

return (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="p-7 min-h-screen flex flex-col justify-between relative overflow-hidden"
>


  {/* ✅ Background (FIXED + animated) */}
  <motion.div
    initial={{ opacity: 0, scale: 1.05 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="absolute inset-0 bg-contain bg-center"
    style={{
      backgroundImage: "url('/doodle-bg.png')"
    }}
  />

  {/* ✅ Overlay */}
  <div className="absolute inset-0 bg-white/60 "></div>

  {/* Back Button */}
  <button
    onClick={() => navigate(-1)}
    className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition z-20"
  >
    <ArrowLeftIcon className="w-5 h-5 text-black" />
  </button>

  {/* Logo */}
  <h1
    onClick={() => navigate("/")}
    className="absolute top-5 right-5 z-20 text-4xl font-extrabold cursor-pointer"
  >
    RideX
  </h1>

  {/* FORM */}
  <motion.div
    initial="hidden"
    animate="show"
    transition={{ staggerChildren: 0.12 }}
    className="relative z-10 mt-10 max-w-md"
  >
    <form onSubmit={submitHandler}>

      <motion.h3 variants={item} className="text-xl font-medium text-gray-700 mb-2">
        What's your email address?
      </motion.h3>

      <motion.input
        variants={item}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-100 px-4 py-4 text-lg border border-gray-300 rounded-md w-full mb-4 focus:ring-2 focus:ring-black outline-none"
        type="email"
        placeholder="name@example.com"
      />

      <motion.h3 variants={item} className="text-xl font-medium text-gray-700 mb-2">
        Enter password
      </motion.h3>

      <motion.input
        variants={item}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-gray-100 px-4 py-4 text-lg border border-gray-300 rounded-md w-full mb-4 focus:ring-2 focus:ring-black outline-none"
        type="password"
        placeholder="password"
      />

      <motion.button
        variants={item}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-6 w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-900 transition"
        type="submit"
      >
        Login
      </motion.button>

      <motion.p variants={item} className="text-center text-lg mt-4">
        Want to become a RideX Captain?{" "}
        <Link to="/captain-signup" className="text-blue-500 hover:underline">
          Sign up as a Captain
        </Link>
      </motion.p>

    </form>
  </motion.div>

  {/* Bottom CTA */}
  <motion.div
    initial={{ y: 40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="relative z-10"
  >
    <Link
      to="/login"
      className="w-full bg-[#40BD40] text-white py-4 rounded-xl flex items-center justify-center gap-2 text-lg font-semibold hover:bg-green-600 transition"
    >
      Sign In As User →
    </Link>
  </motion.div>

</motion.div>


);
};

export default CaptainLogin;
