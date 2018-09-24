// @material-ui/icons
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
// core components/views
import SignInPage from "../views/SignIn";

const loginRoutes = [
  {
    path: "/signIn",
    sidebarName: "Sign In",
    navbarName: "Sign In",
    icon: Person,
    component: SignInPage
  },
  {
    path: "/signUp",
    sidebarName: "Sign Up",
    navbarName: "Sign Up",
    icon: Person,
    component: SignInPage
  },
  { redirect: true, path: "/", to: "/signIn", navbarName: "Redirect" }
];

export default loginRoutes;
