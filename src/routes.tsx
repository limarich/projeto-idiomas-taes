import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";
import { MemoryGame } from "./pages/MemoryGame";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/memory-game",
    element: <MemoryGame />,
  },
]);
