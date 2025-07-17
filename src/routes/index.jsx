import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Customers from "../views/customers/Customers";
import Reservations from "../views/reservations/Reservations";
import Tours from "../views/tours/Tours";
import Hotels from "../views/hotels/Hotels";
import Transports from "../views/transports/Transports";
import Invoices from "../views/invoices/Invoices";
import Payments from "../views/payments/Payments";
import Employees from "../views/employees/Employees";
import Partners from "../views/partners/Partners";
import Inquiries from "../views/inquiries/Inquiries";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/customers/*" element={<Customers />} />
    <Route path="/reservations/*" element={<Reservations />} />
    <Route path="/tours/*" element={<Tours />} />
    <Route path="/hotels/*" element={<Hotels />} />
    <Route path="/transports/*" element={<Transports />} />
    <Route path="/invoices/*" element={<Invoices />} />
    <Route path="/payments/*" element={<Payments />} />
    <Route path="/employees/*" element={<Employees />} />
    <Route path="/partners/*" element={<Partners />} />
    <Route path="/inquiries/*" element={<Inquiries />} />
  </Routes>
);

export default AppRoutes; 