import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div
      className="container-fuild py-4"
      style={{
        background:
          "linear-gradient(45deg, rgba(145, 152, 229,0.6), rgb(255, 255, 255))",
        minHeight: 300,
      }}
    >
      <Outlet />
    </div>
  );
}
