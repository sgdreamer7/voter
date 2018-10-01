// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
// core components/views
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import CreateNewPoll from "../views/CreateNewPoll";
import Poll from "../views/Poll";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/poll/:id",
    sidebarName: "Poll",
    navbarName: "Poll",
    icon: InsertDriveFile,
    component: Poll
  },
  {
    path: "/create",
    sidebarName: "Create",
    navbarName: "Create",
    icon: InsertDriveFile,
    component: CreateNewPoll
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
