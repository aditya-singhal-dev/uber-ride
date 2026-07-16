import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import userDataContext from '../context/userDataContext';
import { useContext } from 'react';
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const [, setUser] = useContext(userDataContext)
  

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/Home');
      }
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
    }

    setEmail('');
    setPassword('');
  };

  // Animation variants
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-screen"
    >

      {/* ✅ Background (FIXED) */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/doodle-bg.png')"
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 p-7 h-screen flex flex-col justify-between">

        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center"
        >
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md"
          >
            <ArrowLeftIcon className="w-5 h-5 text-black" />
          </button>

          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold cursor-pointer"
          >
            RideX
          </h1>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-md w-full"
        >
          <form onSubmit={submitHandler} className="space-y-5">

            <motion.div variants={item}>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                What's your email address?
              </h3>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 px-4 py-3 border rounded-md text-lg focus:ring-2 focus:ring-black outline-none"
                type="email"
                placeholder="name@example.com"
              />
            </motion.div>

            <motion.div variants={item}>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Enter password
              </h3>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 px-4 py-3 border rounded-md text-lg focus:ring-2 focus:ring-black outline-none"
                type="password"
                placeholder="password"
              />
            </motion.div>

            <motion.button
              variants={item}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold"
              type="submit"
            >
              Login
            </motion.button>

            <motion.p variants={item} className="text-center text-md">
              New here?{" "}
              <Link to="/signup" className="text-blue-500 underline">
                Sign up
              </Link>
            </motion.p>

          </form>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Link
            to="/captain-login"
            className="w-full bg-[#edc54c] text-white py-4 rounded-xl flex items-center justify-center gap-2 text-lg font-semibold"
          >
            Sign In As Captain →
          </Link>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default UserLogin;