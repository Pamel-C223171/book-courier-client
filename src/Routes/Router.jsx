import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyBooks from "../Pages/Dashboard/MyBooks/MyBooks";
import AddBook from "../Pages/Dashboard/AddBook/AddBook";
import Orders from "../Pages/Dashboard/Orders/Orders";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import Payments from "../Pages/Dashboard/Payments/Payments";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import ManageBooks from "../Pages/Dashboard/ManageBooks/ManageBooks";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
// import axios from "axios";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: 'coverage',
            Component: Coverage,
            loader: () => fetch('/serviceCenter.json')
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
        {
            path: 'login',
            Component: Login
        },
        {
            path: 'register',
            Component: Register
        },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'my-books',
        Component: MyBooks
      },
      {
        path: 'add-book',
        Component: AddBook,
        loader: () => fetch('/serviceCenter.json')
      },
      {
        path: 'my-orders',
        Component: MyOrders
      },
      {
        path: 'payments',
        Component: Payments
      },
      {
        path: 'orders',
        Component: Orders
      },
      {
        path: 'all-users',
        Component: AllUsers
        // loader: () => axios.get('http://localhost:3000/users')
      },
      {
        path: 'manage-books',
        Component: ManageBooks
      },
      {
        path: 'my-profile',
        Component: MyProfile
      },
    ]
  }
]);