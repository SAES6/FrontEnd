import {lazy} from "react";
import {Navigate} from "react-router-dom";
import SecuredRoute from "../security/SecuredRoute.js";

const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

const Home = lazy(() => import("../views/home/Home.js"));
const SignIn = lazy(() => import("../views/signin/SingIn.js"));
const AdminConsole = lazy(() => import("../views/admin/AdminConsole.js"));
const Questions = lazy(() => import("../views/questions/Questions.js"));
const CreateForm = lazy(() => import("../views/admin/CreateForm.js"));

const ThemeRoutes = [
    {
        path: "/",
        element: <FullLayout/>,
        children: [
            {path: "/", element: <Navigate to="/accueil"/>},
            {path: "/connection", exact: true, element: <SignIn/>},
            {path: "/accueil", exact: true, element: <Home/>},
            {path: "/questions/:id", exact: true, element: <Questions/>},
            {
                path: "/admin-console",
                exact: true,
                element: (<SecuredRoute childrenName="admin-console" children={<AdminConsole/>}></SecuredRoute>),
            },
            {
                path: "/admin-consoletest",
                exact: true,
                element: <AdminConsole/>,
            },
            {path: "/admin-console/formulaire-creation", exact: true, element: <CreateForm/>},
        ],
    },
];

export default ThemeRoutes;
