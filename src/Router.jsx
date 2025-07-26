import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./components/HomePage";
// import Reports from "./components/Report";
// import Expenses from "./components/Expenses";
// import Login from "./components/login";
import Dashboard from "./components/dashboard";
// import Reports from "./components/reports";
import Manage from "./components/manage";
import Layout from "./components/Layout";
function PageRouter() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "manage",
          element: <Manage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}
export default PageRouter;
