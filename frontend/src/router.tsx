import { Navigate, createBrowserRouter } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import HomeLayout from "./layouts/HomeLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Book from "./pages/Book";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/home/main" />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      {
        path: "*",
        element: <Navigate to="/home/main" />,
      },
      {
        path: "main",
        element: <Home />,
      },
      {
        path: "book/:id",
        element: <Book />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Navigate to="/auth/signin" />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
