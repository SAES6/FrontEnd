import { lazy } from "react";
import { Navigate } from "react-router-dom";
import SecuredRoute from "../security/SecuredRoute.js";

const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

const Home = lazy(() => import("../views/home/Home.js"));
const SignIn = lazy(() => import("../views/signin/SingIn"));
const AdminConsole = lazy(() => import("../views/admin-console/AdminConsole"));
const Questions = lazy(() => import("../views/questions/Questions.js"));

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/accueil" /> },
      { path: "/connection", exact: true, element: <SignIn /> },
      { path: "/accueil", exact: true, element: <Home /> },
      { path: "/questions", exact: true, element: <Questions /> },
      {
        path: "/admin-console",
        exact: true,
        element: (
          <SecuredRoute
            childrenName="admin-console"
            children={<AdminConsole />}
          ></SecuredRoute>
        ),
      },
    ],
  },
];

export default ThemeRoutes;
