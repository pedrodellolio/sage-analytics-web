import AppBreadcrumb from "@/components/app-breadcrumb";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { UploadIcon } from "lucide-react";
import { Link, Navigate, Outlet } from "react-router";

export default function PrivateLayout() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return user ? (
    <SidebarProvider>
      <div className="h-screen min-w-full overflow-hidden flex">
        <AppSidebar />
        {/* <ThemeToggle /> */}
        <SidebarInset>
          <div className="dark flex flex-1 flex-col p-6 pt-4 bg-background h-full rounded-sm">
            <nav className="flex flex-row justify-between items-center mb-6 pb-4 border-b">
              <AppBreadcrumb />
              <Button className="ml-auto" variant="outline" asChild>
                <Link to={"/import"}>
                  <UploadIcon
                    className="-ms-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Import CSV
                </Link>
              </Button>
            </nav>

            <main className="flex-1 min-w-full overflow-y-auto rounded-sm">
              <Outlet />
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ) : (
    <Navigate to="/auth/login" />
  );
}
