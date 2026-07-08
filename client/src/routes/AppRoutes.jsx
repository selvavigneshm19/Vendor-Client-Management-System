import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";

import VendorList from "../pages/vendor/VendorList";
import AddVendor from "../pages/vendor/AddVendor";
import EditVendor from "../pages/vendor/EditVendor";
import VendorDetails from "../pages/vendor/VendorDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route element={<AuthLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="vendors" element={<VendorList />} />
          <Route path="vendors/add" element={<AddVendor />} />
          <Route path="vendors/edit/:id" element={<EditVendor />} />
          <Route path="vendors/:id" element={<VendorDetails />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;