import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import axios from 'axios';
import userDataContext from '../context/userDataContext';

const UserSignup = () => {
  const navigate = useNavigate();
  const [, setUser] = useContext(userDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    // validations
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const newUser = {
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
        email,
        password
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/Home');

        // reset
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // animation configs
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
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
      <div className="absolute inset-0 bg-white/60"></div>

      {/* Left */}
      <div className="w-full lg:w-1/2 flex flex-col px-8 lg:px-16 pt-12 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <ArrowLeftIcon className="w-5 h-5 text-black" />
          </button>

          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold cursor-pointer"
          >
            RideX
          </h1>
        </div>

        {/* Form */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-md"
        >
          <motion.h2 variants={item} className="text-4xl font-semibold mb-4">
            Create an account
          </motion.h2>

          <form onSubmit={submitHandler} className="space-y-5">

            {/* Name */}
            <motion.div variants={item}>
              <p className="text-sm text-gray-600 mb-2">Full name</p>
              <div className="flex gap-3">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-1/2 bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 focus:ring-black outline-none"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-1/2 bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 focus:ring-black outline-none"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.input
              variants={item}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
              className="w-full bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 focus:ring-black outline-none"
            />

            {/* Password */}
            <motion.input
              variants={item}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 focus:ring-black outline-none"
            />

            {/* Confirm */}
            <motion.input
              variants={item}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm password"
              className={`w-full bg-gray-100 px-4 py-3 rounded-md border focus:ring-2 outline-none ${
                error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-black'
              }`}
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Button */}
            <motion.button
              variants={item}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={
                !firstName ||
                !lastName ||
                !email ||
                !password ||
                password !== confirmPassword
              }
              className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold disabled:bg-gray-400"
            >
              Create account
            </motion.button>

            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="underline font-medium">
                Sign in
              </Link>
            </p>

          </form>
        </motion.div>
      </div>

      {/* Right */}
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <div className="text-center px-10">
          <h2 className="text-4xl font-bold mb-4">
            Ride smarter with RideX
          </h2>
          <p className="text-lg text-gray-700">
            Fast rides, reliable drivers, seamless experience.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default UserSignup;