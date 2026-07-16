import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BookmarkIcon,
  UserIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔽 Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();

        // adjust based on backend
        setUser(data.user || data);
      } catch (err) {
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return <div className="mt-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black pb-24">
      {/* 🔝 Header */}
      <div className="flex items-center gap-4 p-4 border-b">
        <ArrowLeftIcon
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-lg font-semibold">Account</h1>
      </div>

      {/* 🔽 Title */}
      <h2 className="text-2xl font-bold px-4 mt-6">Personal info</h2>

      {/* 🔽 Avatar */}
      <div className="flex items-center gap-4 px-4 mt-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold">
          {user.fullname?.firstname?.charAt(0) || "U"}
        </div>
      </div>

      {/* 🔽 Info List */}
      <div className="mt-6 divide-y">
        <Row
          label="Name"
          value={`${user.fullname?.firstname || ""} ${
            user.fullname?.lastname || ""
          }`}
        />

        <Row label="Gender" value={user.gender || "Not set"} />

        <Row label="Phone number" value={user.phone} />

        <Row label="Email" value={user.email} />

        <Row label="Language" value="Update device language" />
      </div>

      {/* 🔓 Logout */}
      <div className="px-4 mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* 🔻 Bottom Navbar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-md px-6 py-3 flex justify-between items-center">
        <div
          onClick={() => navigate("/home")}
          className="flex flex-col items-center text-gray-500 cursor-pointer"
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </div>

        <div className="flex flex-col items-center text-gray-500">
          <BookmarkIcon className="w-6 h-6" />
          <span className="text-xs">Activity</span>
        </div>

        <div className="flex flex-col items-center text-black">
          <UserIcon className="w-6 h-6" />
          <span className="text-xs">Account</span>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

/* 🔽 Row Component */
const Row = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center px-4 py-4">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-base font-medium">{value}</p>
      </div>
      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
    </div>
  );
};