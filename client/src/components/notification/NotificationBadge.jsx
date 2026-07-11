import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

import { getUnreadNotificationCount } from "../../services/notificationService";

const NotificationBadge = ({ onClick }) => {

    const [count, setCount] = useState(0);

    const fetchUnreadCount = async () => {

        try {

            const response = await getUnreadNotificationCount();

            setCount(response.unreadCount || 0);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        fetchUnreadCount();

        const interval = setInterval(fetchUnreadCount, 30000);

        return () => clearInterval(interval);

    }, []);

    return (

        <button
            onClick={onClick}
            className="relative p-2 rounded-xl hover:bg-slate-800 transition"
        >

            <Bell
                size={22}
                className="text-white"
            />

            {count > 0 && (

                <span
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-semibold"
                >
                    {count > 99 ? "99+" : count}
                </span>

            )}

        </button>

    );

};

export default NotificationBadge;