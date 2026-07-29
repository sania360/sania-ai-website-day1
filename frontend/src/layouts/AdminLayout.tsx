import { Outlet } from "react-router-dom";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-mist dark:bg-navy-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Topbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
