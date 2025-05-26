import React from "react";
// import { Navigate } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";

type GuardedRouteProps = {
  children: React.ReactNode;
};

function GuardedRoute({ children }: GuardedRouteProps) {
  // const { user, authChecked } = useAuth();
  // if (!user && authChecked) {
  // return <Navigate to="/login" replace />;
  // }
  return (
    <div style={{ display: "flex" }}>
      <main style={{ flexGrow: 1, minHeight: "100vh" }}>{children}</main>
    </div>
  );
}

export default GuardedRoute;
