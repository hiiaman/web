import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAutoActivePet } from "@features/pets/hooks/useAutoActivePet";
import { PageSEO } from "@shared/components/seo/PageSEO";

export default function AppShell() {
  useAutoActivePet();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <PageSEO noIndex />
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
