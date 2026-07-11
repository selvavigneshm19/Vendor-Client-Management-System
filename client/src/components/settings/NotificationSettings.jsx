const NotificationSettings = ({
    settings,
    handleChange,
}) => {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <h2 className="text-2xl font-semibold text-white mb-6">
                Notification Settings
            </h2>

            <div className="space-y-6">

                <div className="flex justify-between items-center bg-slate-800 rounded-xl p-5">

                    <div>

                        <h3 className="text-white font-medium">
                            Email Notifications
                        </h3>

                        <p className="text-gray-400 text-sm">
                            Receive notification emails.
                        </p>

                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">

                        <input
                            type="checkbox"
                            className="sr-only peer"
                            name="emailNotifications"
                            checked={settings.emailNotifications}
                            onChange={handleChange}
                        />

                        <div className="w-12 h-7 bg-gray-600 rounded-full peer peer-checked:bg-violet-600 transition">

                        </div>

                        <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-5">

                        </div>

                    </label>

                </div>

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-gray-300">

                        Current Status :

                        <span
                            className={`ml-2 font-semibold ${settings.emailNotifications
                                    ? "text-green-400"
                                    : "text-red-400"
                                }`}
                        >

                            {settings.emailNotifications
                                ? "Enabled"
                                : "Disabled"}

                        </span>

                    </p>

                </div>

            </div>

        </div>

    );

};

export default NotificationSettings;