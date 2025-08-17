import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./ui/breadcrumb";
import { useLocation } from "react-router";

export default function AppBreadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="m-0">
      <BreadcrumbList className="flex items-center">
        {segments.map((segment, i) => {
          const isLast = i === segments.length - 1;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <BreadcrumbItem
              key={i}
              className="flex items-center font-semibold text-lg"
            >
              <BreadcrumbLink href={`/${segments.slice(0, i + 1).join("/")}`}>
                {label}
              </BreadcrumbLink>
              {!isLast && <p className="text-foreground/60/40">/</p>}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
