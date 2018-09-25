// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/poll",
    sidebarName: "Poll",
    navbarName: "Poll",
    icon: InsertDriveFile,
    component: UserProfile
  },
  {
    path: "/create",
    sidebarName: "Create",
    navbarName: "Create",
    icon: InsertDriveFile,
    component: TableList
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
