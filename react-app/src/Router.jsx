import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./components/HomePage";
// import Reports from "./components/Report";
// import Expenses from "./components/Expenses";
// import Login from "./components/login";
import Dashboard from "./components/dashboard";
// import Reports from "./components/reports";
import Manage from "./components/manage";
function PageRouter() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/Dashboard",
      element: <Dashboard />,
    },
    {
      path: "/Manage",
      element: <Manage />,
    },
  ]);
  return <RouterProvider router={routes} />;
}
export default PageRouter;
