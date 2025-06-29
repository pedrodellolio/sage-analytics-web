import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function PrivateLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="dark flex flex-1 flex-col gap-4 p-2 pt-0 rounded-lg bg-content-background">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
