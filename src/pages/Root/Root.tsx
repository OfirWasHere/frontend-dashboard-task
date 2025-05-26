import React from "react";
import { Outlet, useOutlet } from "react-router";
import AuthPage from "../AuthPage/AuthPage";

function Root() {
  const outlet = useOutlet();
  return outlet ? <Outlet /> : <AuthPage />;
}

export default Root;
