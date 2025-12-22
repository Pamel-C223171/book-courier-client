# BookCourier – Library-to-Home Delivery System

## Project Overview
BookCourier is a library delivery management system where users can request book pickup or delivery from their nearby libraries. The system helps students, researchers, and readers borrow and return books without physically visiting the library.

This project is designed to assess skills, creativity, and problem-solving abilities. It demonstrates a full-stack web application with React on the client side, Node.js + Express on the server side, MongoDB database, and Firebase authentication.

---

## Live Site
[BookCourier Live Site](https://book-courier-98630.web.app/)

---

## Admin Credentials
- **Admin Email:** anis@gmail.com
- **Admin Password:** P@mel1

---

## Key Features

### User Features
- Email/password login + Google login
- Profile management (update name & profile picture)
- Browse all books
- Place orders with pending/unpaid status
- Cancel pending orders
- Pay for pending orders
- Wishlist for books
- Review & rating for ordered books
- Search & sort books by name and price
- Responsive UI with light/dark mode support

### Librarian Features
- Add books with name, image, author, price, and status (published/unpublished)
- View and edit own books
- Manage orders (update status from pending → shipped → delivered)
- Responsive dashboard layout

### Admin Features
- Manage all users (promote to librarian/admin)
- Manage all books (publish/unpublish/delete)
- Full server and client dashboard access

### UI & Design
- Responsive design for all devices
- Grid layout with equal card sizes
- Navbar, footer, and main layout consistency
- Light/Dark mode toggle
- Animated sections and skeleton loaders
- Eye-friendly color contrast and proper spacing

### Deployment
- Server deployed on production (CORS, 404, 504 errors handled)
- Firebase hosting for client side
- Environment variables used for Firebase config and MongoDB credentials

---

## Pages & Layout

### Home Page
- Banner with 3 sliders (book images, title, description, link button)
- Latest books section
- Coverage map section
- "Why Choose BookCourier" section
- At least 1 animated section + 2 extra custom-designed sections

### Dashboard
- User Dashboard: My Orders, My Profile, Invoices
- Librarian Dashboard: Add Book, My Books, Orders
- Admin Dashboard: All Users, Manage Books, My Profile
- Sidebar collapsible and responsive for mobile/tablet

### Books Pages
- All Books page (card layout, search & sort)
- Book Details page (order modal with Name, Email, Phone, Address)
- Order modal saves info to database and updates order/payment status

---

## Technologies Used
- **Frontend:** React, Tailwind CSS, ShadCN/UI (optional)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase (Email/Password + Google)
- **State & Data Fetching:** TanStack Query (optional)
- **Deployment:** Firebase Hosting (Client), Vercel/Other (Server)
- **Others:** Skeleton loader, responsive design, light/dark mode toggle

---

## Project Structure
book-courier/
│
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── layouts/
│ ├── hooks/
│ └── App.jsx
│
├── server/ # Node.js + Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── .env.example # Environment variable template
└── README.md

