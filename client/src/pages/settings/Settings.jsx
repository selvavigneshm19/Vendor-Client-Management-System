import { useEffect, useState } from "react";

import useTheme from "../../hooks/useTheme";

import {
    createSettings,
    getSettings,
    updateSettings,
} from "../../services/settingsService";

import AppearanceSettings from "../../components/settings/AppearanceSettings";
import CompanySettingsForm from "../../components/settings/CompanySettingsForm";
import NotificationSettings from "../../components/settings/NotificationSettings";
import PreferencesSettings from "../../components/settings/PreferencesSettings";
import SettingsSidebar from "../../components/settings/SettingsSidebar";

const defaultSettings = {
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyWebsite: "",
    companyAddress: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    currency: "INR",
    timeZone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    language: "English",
    theme: "Light",
    companyLogo: "",
    emailNotifications: true,
};

const Settings = () => {

    const { setTheme } = useTheme();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [settings, setSettings] = useState(defaultSettings);

    const [exists, setExists] = useState(false);

    const [activeTab, setActiveTab] = useState("company");

    useEffect(() => {
        fetchSettings();
    }, []);

    // Sync theme whenever settings change
    useEffect(() => {

        if (settings.theme) {

            setTheme(settings.theme.toLowerCase());

        }

    }, [settings.theme, setTheme]);

    const fetchSettings = async () => {

        try {

            setLoading(true);

            const response = await getSettings();

            setSettings(response.settings);

            setExists(true);

        } catch (error) {

            if (error.response?.status === 404) {

                setExists(false);

            } else {

                console.error(error);

            }

        } finally {

            setLoading(false);

        }

    };

    // ===========================================
    // Handle Input Change
    // ===========================================

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setSettings((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    };

    // ===========================================
    // Save Settings
    // ===========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            if (exists) {

                await updateSettings(settings);

                alert("Settings updated successfully.");

            } else {

                await createSettings(settings);

                alert("Settings created successfully.");

                setExists(true);

            }

            // Apply theme immediately
            setTheme(settings.theme.toLowerCase());

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to save settings."
            );

        } finally {

            setSaving(false);

        }

    };

    // ===========================================
    // Loading
    // ===========================================

    if (loading) {

        return (

            <div className="flex items-center justify-center h-[70vh]">

                <div className="text-white text-lg">
                    Loading Settings...
                </div>

            </div>

        );

    }

    // ===========================================
    // Render
    // ===========================================

    return (

        <div className="space-y-6">

            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold text-white">
                    Settings
                </h1>

                <p className="text-gray-400 mt-2">
                    Manage your organization settings and preferences.
                </p>

            </div>

            <div className="grid grid-cols-12 gap-6">

                {/* Sidebar */}

                <div className="col-span-3">

                    <SettingsSidebar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                </div>

                {/* Content */}

                <div className="col-span-9">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Company */}

                        {activeTab === "company" && (

                            <CompanySettingsForm
                                settings={settings}
                                handleChange={handleChange}
                            />

                        )}

                        {/* Preferences */}

                        {activeTab === "preferences" && (

                            <PreferencesSettings
                                settings={settings}
                                handleChange={handleChange}
                            />

                        )}

                        {/* Appearance */}

                        {activeTab === "appearance" && (

                            <AppearanceSettings
                                settings={settings}
                                handleChange={handleChange}
                            />

                        )}

                        {/* Notifications */}

                        {activeTab === "notifications" && (

                            <NotificationSettings
                                settings={settings}
                                handleChange={handleChange}
                            />

                        )}

                        {/* Save Button */}

                        <div className="flex justify-end">

                            <button
                                type="submit"
                                disabled={saving}
                                className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold transition"
                            >
                                {saving
                                    ? "Saving..."
                                    : exists
                                        ? "Update Settings"
                                        : "Create Settings"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default Settings;