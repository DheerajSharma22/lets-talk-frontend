import React, { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import { PrivateRoute, PublicRoute } from './Routes/index';
import VerifyEmail from "./Pages/VerifyEmail";
import ResetPassword from "./Pages/ResetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import axios from "axios";

const App = () => {
  return (
    <>
      <div className="font-poppins">
        <Routes>

          <Route path="/" exact element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>} />

          <Route path="/login" exact element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />

          <Route path="/signup" exact element={
            <PublicRoute>
              <Signup />
            </PublicRoute>} />

          <Route path="/verify-email" exact element={
            <PublicRoute>
              <VerifyEmail />
            </PublicRoute>} />

          <Route path="/reset-password" exact element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>} />

          <Route path="/update-password/:token" exact element={
            <PublicRoute>
              <UpdatePassword />
            </PublicRoute>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
