const AppearanceSettings = ({
    settings,
    handleChange,
}) => {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <h2 className="text-2xl font-semibold text-white mb-6">
                Appearance
            </h2>

            <div className="space-y-6">

                <div>

                    <label className="block text-gray-300 mb-2">
                        Theme
                    </label>

                    <select
                        name="theme"
                        value={settings.theme}
                        onChange={handleChange}
                        className="w-full md:w-80 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    >

                        <option value="Light">
                            Light
                        </option>

                        <option value="Dark">
                            Dark
                        </option>

                    </select>

                </div>

                <div className="bg-slate-800 rounded-xl p-6">

                    <h3 className="text-white font-semibold mb-2">
                        Preview
                    </h3>

                    <p className="text-gray-400">
                        Current Theme :
                        <span className="text-violet-400 ml-2 font-semibold">
                            {settings.theme}
                        </span>
                    </p>

                </div>

            </div>

        </div>

    );

};

export default AppearanceSettings;