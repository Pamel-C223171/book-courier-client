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
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import AllBooks from "../Pages/Home/AllBooks/AllBooks";
import BookDetails from "../Pages/Home/BookDetails/BookDetails";
import EditBook from "../Pages/Dashboard/MyBooks/EditBook";
import AdminRoute from "./AdminRoute";
import LibrarianRoute from "./LibrarianRoute";
import UserRoute from "./UserRoute";
import ManageBooks from "../Pages/Dashboard/ManageBooks/ManageBooks";
import PaymentSuccess from "../Pages/Dashboard/Payments/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payments/PaymentCancelled";
import Error from "../Pages/Error/Error";
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
      },
      {
        path: 'all-books',
        Component: AllBooks
      },
      {
        path: 'book-details/:id',
        Component: BookDetails,
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
        element: <LibrarianRoute><MyBooks></MyBooks></LibrarianRoute>
      },
      {
        path: 'edit-book/:id',
        element: <LibrarianRoute><EditBook></EditBook></LibrarianRoute>
      },
      {
        path: 'add-book',
        element: <LibrarianRoute><AddBook></AddBook></LibrarianRoute>,
        loader: () => fetch('/serviceCenter.json')
      },
      {
        path: 'my-orders',
        element: <UserRoute><MyOrders></MyOrders></UserRoute>
      },
      {
        path: 'payments',
        element: <UserRoute><Payments></Payments></UserRoute>
      },
      {
        path: 'payment-success',
        element: <UserRoute><PaymentSuccess></PaymentSuccess></UserRoute>
      },
      {
        path: 'payment-cancelled',
        element: <UserRoute><PaymentCancelled></PaymentCancelled></UserRoute>
      },
      {
        path: 'orders',
        element: <LibrarianRoute><Orders></Orders></LibrarianRoute>
      },
      {
        path: 'all-users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        // loader: () => axios.get('http://localhost:3000/users')
      },
      {
        path: 'manage-books',
        element: <AdminRoute><ManageBooks></ManageBooks></AdminRoute>
      },
      {
        path: 'my-profile',
        element: <UserRoute><MyProfile></MyProfile></UserRoute>
      },
      {
        path: 'profile',
        element: <AdminRoute><MyProfile></MyProfile></AdminRoute>
      },
    ]
  },
  {
    path: '*',
    Component: Error
  },
]);