import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="container-fuild my-3">
      <Outlet />
    </div>
  );
}
