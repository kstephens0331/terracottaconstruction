import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Quotes from "./pages/Quotes";
import WorkOrders from "./pages/WorkOrders";
import SubmitWorkOrder from "./pages/SubmitWorkOrder";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Auth
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/quotes" element={<PrivateRoute><Quotes /></PrivateRoute>} />
        <Route path="/work-orders" element={<PrivateRoute><WorkOrders /></PrivateRoute>} />
        <Route path="/submit-work-order" element={<PrivateRoute><SubmitWorkOrder /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
