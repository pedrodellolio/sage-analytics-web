import { Link, useLocation } from "react-router";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
  Sidebar,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { ChartSpline, CreditCard, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartSpline,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: CreditCard,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Tag,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar
      variant="inset"
      {...props}
      className="dark scheme-only-dark max-lg:p-3 lg:pe-1"
    >
      <SidebarHeader>
        <div className="flex justify-between items-center gap-2">
          <Link className="inline-flex" to="/">
            <span className="sr-only">Logo</span>
            <h1 className="text-md font-bold text-accent">Sage</h1>
          </Link>
          <SidebarTrigger className="text-foreground/60/80 hover:text-foreground/80 hover:bg-transparent!" />
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0 mt-3 pt-3">
        <SidebarGroup className="px-1 pt-1">
          <SidebarGroupLabel className="uppercase text-foreground/60">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon
                          color={`${
                            isActive ? "var(--accent)" : "var(--foreground)"
                          }`}
                          className={cn("transition-colors")}
                        />
                        <span
                          className={cn(
                            "transition-colors",
                            isActive
                              ? "text-accent font-medium"
                              : "text-foreground/70"
                          )}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
