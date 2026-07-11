import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import useAuth from "../../hooks/useAuth";

import NotificationBadge from "../notification/NotificationBadge";
import NotificationDropdown from "../notification/NotificationDropdown";

import {
  getMyNotifications,
  markNotificationAsRead,
} from "../../services/notificationService";

const Navbar = () => {

  const { user } = useAuth();

  const [openNotifications, setOpenNotifications] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const notificationRef = useRef(null);

  // =====================================
  // Fetch Notifications
  // =====================================

  const fetchNotifications = async () => {

    try {

      setLoadingNotifications(true);

      const response = await getMyNotifications();

      setNotifications(response.notifications || []);

    } catch (error) {

      console.error(error);

    } finally {

      setLoadingNotifications(false);

    }

  };

  // =====================================
  // Mark Notification as Read
  // =====================================

  const handleRead = async (id) => {

    try {

      await markNotificationAsRead(id);

      fetchNotifications();

    } catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // Load Notifications
  // =====================================

  useEffect(() => {

    fetchNotifications();

  }, []);

  // =====================================
  // Close Dropdown on Outside Click
  // =====================================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {

        setOpenNotifications(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  return (

    <header className="h-20 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8">

      {/* Left */}

      <div>

        <h1 className="text-2xl font-bold text-white">

          Dashboard

        </h1>

        <p className="text-gray-400">

          Welcome back, {user?.name || "User"} 👋

        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-xl bg-slate-800 text-white outline-none w-72"
          />

        </div>

        {/* Notification */}

        <div
          className="relative"
          ref={notificationRef}
        >

          <NotificationBadge
            onClick={() =>
              setOpenNotifications(
                !openNotifications
              )
            }
          />

          {openNotifications && (

            <NotificationDropdown
              notifications={notifications}
              loading={loadingNotifications}
              onMarkAsRead={handleRead}
            />

          )}

        </div>

      </div>

    </header>

  );

};

export default Navbar;