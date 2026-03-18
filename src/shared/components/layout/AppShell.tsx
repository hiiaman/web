import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAutoActivePet } from "@features/pets/hooks/useAutoActivePet";
import { PageSEO } from "@shared/components/seo/PageSEO";

export default function AppShell() {
  useAutoActivePet();
  return (
    <>
      <PageSEO noIndex />
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
    </>
  );
}
