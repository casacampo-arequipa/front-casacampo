import React from "react";
import { Drawer, Sidebar } from "flowbite-react";
import SideNav from "../views/admin/partials/SideNav";

const SidebarAdmin = ({ isOpen, setIsOpen }) => {
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Drawer open={isOpen} onClose={handleClose} className="rounded-r-xl">
        <Drawer.Header title="Drawer" />
        <Drawer.Items>
          <SideNav />
        </Drawer.Items>
      </Drawer>

      <Sidebar className="hidden lg:block border rounded-xl overflow-hidden shadow-lg">
        <SideNav />
      </Sidebar>
    </>
  );
};

export default SidebarAdmin;
