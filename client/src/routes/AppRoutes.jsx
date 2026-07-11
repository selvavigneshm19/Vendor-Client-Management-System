import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleProtectedRoute from "../components/common/RoleProtectedRoute";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";

// Vendor Pages
import AddVendor from "../pages/vendor/AddVendor";
import EditVendor from "../pages/vendor/EditVendor";
import VendorDetails from "../pages/vendor/VendorDetails";
import VendorList from "../pages/vendor/VendorList";

// Client Pages
import AddClient from "../pages/client/AddClient";
import ClientDetails from "../pages/client/ClientDetails";
import ClientList from "../pages/client/ClientList";
import EditClient from "../pages/client/EditClient";

// Project Pages
import AddProject from "../pages/project/AddProject";
import EditProject from "../pages/project/EditProject";
import ProjectDetails from "../pages/project/ProjectDetails";
import ProjectList from "../pages/project/ProjectList";

// Employee Pages
import AddEmployee from "../pages/employee/AddEmployee";
import EditEmployee from "../pages/employee/EditEmployee";
import EmployeeDetails from "../pages/employee/EmployeeDetails";
import EmployeeList from "../pages/employee/EmployeeList";

// Attendance Pages
import AddAttendance from "../pages/attendance/AddAttendance";
import AttendanceDetails from "../pages/attendance/AttendanceDetails";
import AttendanceList from "../pages/attendance/AttendanceList";
import EditAttendance from "../pages/attendance/EditAttendance";

// Leave Pages
import AddLeave from "../pages/leave/AddLeave";
import EditLeave from "../pages/leave/EditLeave";
import LeaveDetails from "../pages/leave/LeaveDetails";
import LeaveList from "../pages/leave/LeaveList";

// Payroll Pages
import AddPayroll from "../pages/payroll/AddPayroll";
import EditPayroll from "../pages/payroll/EditPayroll";
import PayrollDetails from "../pages/payroll/PayrollDetails";
import PayrollList from "../pages/payroll/PayrollList";

// Task Pages
import AddTask from "../pages/task/AddTask";
import EditTask from "../pages/task/EditTask";
import TaskDetails from "../pages/task/TaskDetails";
import TaskList from "../pages/task/TaskList";

// Report Pages
// import ReportDashboard from "../pages/reports/ReportDashboard";
import AttendanceReport from "../pages/reports/AttendanceReport";
import EmployeeReport from "../pages/reports/EmployeeReport";
import LeaveReport from "../pages/reports/LeaveReport";
import PayrollReport from "../pages/reports/PayrollReport";
import ReportDashboard from "../pages/reports/ReportDashboard";
import TaskReport from "../pages/reports/TaskReport";

// Notification Pages
import NotificationList from "../pages/notifications/NotificationList";

// ================= Settings =================
import Settings from "../pages/settings/Settings";


// ================= Admin Pages =================
import AddAdmin from "../pages/admin/AddAdmin";
import AdminDetails from "../pages/admin/AdminDetails";
import AdminList from "../pages/admin/AdminList";
import EditAdmin from "../pages/admin/EditAdmin";

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
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
        >

          {/* Dashboard Home */}
          <Route index element={<Dashboard />} />

          {/* ================= Vendor Routes ================= */}
          <Route
            path="vendors"
            element={
              <RoleProtectedRoute allowedRoles={["superadmin", "admin"]}>
                <VendorList />
              </RoleProtectedRoute>
            }
          />
          <Route path="vendors/add" element={<AddVendor />} />
          <Route path="vendors/edit/:id" element={<EditVendor />} />
          <Route path="vendors/:id" element={<VendorDetails />} />

          {/* ================= Client Routes ================= */}
          <Route path="clients" element={<ClientList />} />
          <Route path="clients/add" element={<AddClient />} />
          <Route path="clients/edit/:id" element={<EditClient />} />
          <Route path="clients/:id" element={<ClientDetails />} />

          {/* ================= Project Routes ================= */}
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/add" element={<AddProject />} />
          <Route path="projects/edit/:id" element={<EditProject />} />
          <Route path="projects/:id" element={<ProjectDetails />} />

          {/* ================= Employee Routes ================= */}
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/add" element={<AddEmployee />} />
          <Route path="employees/edit/:id" element={<EditEmployee />} />
          <Route path="employees/:id" element={<EmployeeDetails />} />

          {/* ================= Attendance Routes ================= */}
          <Route path="attendance" element={<AttendanceList />} />
          <Route path="attendance/add" element={<AddAttendance />} />
          <Route path="attendance/edit/:id" element={<EditAttendance />} />
          <Route path="attendance/:id" element={<AttendanceDetails />} />

          {/* ================= Leave Routes ================= */}
          <Route path="leave" element={<LeaveList />} />
          <Route path="leave/add" element={<AddLeave />} />
          <Route path="leaves/edit/:id" element={<EditLeave />} />
          <Route path="leave/:id" element={<LeaveDetails />} />

          {/* ================= Payroll Routes ================= */}
          <Route path="payroll" element={<PayrollList />} />
          <Route path="payroll/add" element={<AddPayroll />} />
          <Route path="payroll/edit/:id" element={<EditPayroll />} />
          <Route path="payroll/:id" element={<PayrollDetails />} />

          {/* ================= Task Routes ================= */}
          <Route path="tasks" element={<TaskList />} />
          <Route path="tasks/add" element={<AddTask />} />
          <Route path="tasks/edit/:id" element={<EditTask />} />
          <Route path="tasks/:id" element={<TaskDetails />} />

          {/* ================= Report Routes ================= */}
          {/* <Route path="reports" element={<ReportDashboard />} /> */}
          {/* ================= Reports ================= */}
          <Route path="reports" element={<ReportDashboard />} />

          {/* ================= Notification Routes ================= */}
          <Route path="notifications" element={<NotificationList />} />

          {/* ================= Settings Routes ================= */}
          <Route path="settings" element={<Settings />} />

          {/* ================= Admin Routes ================= */}

          <Route
            path="admins"
            element={
              <RoleProtectedRoute allowedRoles={["superadmin"]}>
                <AdminList />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="admins/add"
            element={
              <RoleProtectedRoute allowedRoles={["superadmin"]}>
                <AddAdmin />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="admins/edit/:id"
            element={
              <RoleProtectedRoute allowedRoles={["superadmin"]}>
                <EditAdmin />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="admins/:id"
            element={
              <RoleProtectedRoute allowedRoles={["superadmin"]}>
                <AdminDetails />
              </RoleProtectedRoute>
            }
          />




          <Route
            path="reports/employees"
            element={<EmployeeReport />}
          />

          <Route
            path="reports/attendance"
            element={<AttendanceReport />}
          />

          <Route
            path="reports/leaves"
            element={<LeaveReport />}
          />

          <Route
            path="reports/payroll"
            element={<PayrollReport />}
          />

          <Route
            path="reports/tasks"
            element={<TaskReport />}
          />



        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;