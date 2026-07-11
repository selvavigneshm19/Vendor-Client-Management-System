const PreferencesSettings = ({
    settings,
    handleChange,
}) => {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <h2 className="text-2xl font-semibold text-white mb-6">
                Preferences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Currency */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Currency
                    </label>

                    <select
                        name="currency"
                        value={settings.currency}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>

                </div>

                {/* Time Zone */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Time Zone
                    </label>

                    <select
                        name="timeZone"
                        value={settings.timeZone}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    >
                        <option value="Asia/Kolkata">
                            Asia/Kolkata
                        </option>

                        <option value="UTC">
                            UTC
                        </option>

                        <option value="America/New_York">
                            America/New_York
                        </option>

                    </select>

                </div>

                {/* Date Format */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Date Format
                    </label>

                    <select
                        name="dateFormat"
                        value={settings.dateFormat}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    >

                        <option>DD/MM/YYYY</option>

                        <option>MM/DD/YYYY</option>

                        <option>YYYY-MM-DD</option>

                    </select>

                </div>

                {/* Language */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Language
                    </label>

                    <select
                        name="language"
                        value={settings.language}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    >

                        <option>English</option>

                        <option>Tamil</option>

                        <option>Hindi</option>

                    </select>

                </div>

            </div>

        </div>

    );

};

export default PreferencesSettings;