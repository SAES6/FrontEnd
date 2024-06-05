import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import SecuredRoute from '../security/SecuredRoute.js';
const FullLayout = lazy(() => import('../layouts/FullLayout.js'));
const Home = lazy(() => import('../views/home/Home.js'));
const APropos = lazy(() => import('../views/home/APropos.js'));
const SignIn = lazy(() => import('../views/signin/SingIn.js'));
const AdminConsole = lazy(() => import('../views/admin/AdminConsole.js'));
const AdminGestion = lazy(() => import('../views/admin-gestion/AdminGestion'));
const Questions = lazy(() => import('../views/questions/Questions.js'));
const Summary = lazy(() => import('../views/summary/Summary.jsx'));

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to='/accueil' /> },
      { path: '/connection', exact: true, element: <SignIn /> },
      { path: '/accueil', exact: true, element: <Home /> },
      { path: '/aPropos', exact: true, element: <APropos /> },
      { path: '/questions/:id', exact: true, element: <Questions /> },
      { path: '/summary/:id', exact: true, element: <Summary /> },
      {
        path: '/admin-console',
        exact: true,
        element: (
          <SecuredRoute
            childrenName='admin-console'
            children={<AdminConsole />}
          ></SecuredRoute>
        ),
      },
      {
        path: '/admin-gestion',
        exact: true,
        element: (
          <SecuredRoute
            childrenName='admin-gestion'
            children={<AdminGestion />}
          ></SecuredRoute>
        ),
      },
      {
        path: '/admin-consoletest',
        exact: true,
        element: <AdminConsole />,
      },
    ],
  },
];

export default ThemeRoutes;
