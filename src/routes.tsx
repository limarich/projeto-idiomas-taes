import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
]);
