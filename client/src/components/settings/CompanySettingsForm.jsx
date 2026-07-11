const CompanySettingsForm = ({
    settings,
    handleChange,
}) => {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <h2 className="text-2xl font-semibold text-white mb-6">
                Company Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Company Name */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Company Name
                    </label>

                    <input
                        type="text"
                        name="companyName"
                        value={settings.companyName}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    />

                </div>

                {/* Company Email */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Company Email
                    </label>

                    <input
                        type="email"
                        name="companyEmail"
                        value={settings.companyEmail}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    />

                </div>

                {/* Company Phone */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Company Phone
                    </label>

                    <input
                        type="text"
                        name="companyPhone"
                        value={settings.companyPhone}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    />

                </div>

                {/* Website */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Company Website
                    </label>

                    <input
                        type="text"
                        name="companyWebsite"
                        value={settings.companyWebsite}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    />

                </div>

                {/* Address */}

                <div className="md:col-span-2">

                    <label className="block text-gray-300 mb-2">
                        Company Address
                    </label>

                    <textarea
                        rows="3"
                        name="companyAddress"
                        value={settings.companyAddress}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    />

                </div>

                {/* City */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        City
                    </label>

                    <input
                        type="text"
                        name="city"
                        value={settings.city}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    />

                </div>

                {/* State */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        State
                    </label>

                    <input
                        type="text"
                        name="state"
                        value={settings.state}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    />

                </div>

                {/* Country */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Country
                    </label>

                    <input
                        type="text"
                        name="country"
                        value={settings.country}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    />

                </div>

                {/* Pincode */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Pincode
                    </label>

                    <input
                        type="text"
                        name="pincode"
                        value={settings.pincode}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    />

                </div>

                {/* Logo */}

                <div className="md:col-span-2">

                    <label className="block text-gray-300 mb-2">
                        Company Logo URL
                    </label>

                    <input
                        type="text"
                        name="companyLogo"
                        value={settings.companyLogo}
                        onChange={handleChange}
                        placeholder="https://example.com/logo.png"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    />

                </div>

            </div>

        </div>

    );

};

export default CompanySettingsForm;