import React from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "../navigation/AppSidebar";
import ProductivitySidebar from "../navigation/ProductivitySidebar";

const sidebarVariants = {
  classic: AppSidebar,
  productivity: ProductivitySidebar,
};

const ActiveSidebar = sidebarVariants.classic;
// Switch to the alternate sidebar by changing the line above to:
// const ActiveSidebar = sidebarVariants.productivity;

const AppLayout = () => {
  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#05070b] text-white">
      <ActiveSidebar />

      <main className="relative min-h-0 flex-1 overflow-y-auto bg-[#070b12]">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
