import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type NavigationItem = {
  label: string;
  path: string;
  roles: Array<"owner" | "manager" | "staff">;
};

const navigation: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    roles: ["owner", "manager", "staff"],
  },
  {
    label: "Orders",
    path: "/dashboard/orders",
    roles: ["owner", "manager", "staff"],
  },
  {
    label: "Tables",
    path: "/dashboard/tables",
    roles: ["owner", "manager", "staff"],
  },
  {
    label: "Menu",
    path: "/dashboard/menu",
    roles: ["owner", "manager", "staff"],
  },
  {
    label: "Payments",
    path: "/dashboard/payments",
    roles: ["owner", "manager", "staff"],
  },
  {
    label: "Staff",
    path: "/dashboard/staff",
    roles: ["owner", "manager"],
  },
  {
    label: "Reports",
    path: "/dashboard/reports",
    roles: ["owner", "manager"],
  },
];

export default function Sidebar() {
  const { role, restaurantName } = useAuth();

  const visibleNavigation = navigation.filter((item) => {
    if (!role) {
      return false;
    }

    return item.roles.includes(role);
  });

  return (
    <aside className="hidden w-64 shrink-0 border-r border-[#E5E1D8] bg-white lg:flex lg:flex-col">
      <div className="flex h-[72px] items-center border-b border-[#E5E1D8] px-6">
        <NavLink
          to="/dashboard"
          className="text-xl font-bold tracking-tight text-[#17211D]"
        >
          Restaurant<span className="text-[#E4572E]">OS</span>
        </NavLink>
      </div>

      <div className="border-b border-[#E5E1D8] p-4">
        <div className="rounded-lg bg-[#F7F5F0] p-3">
          <p className="text-xs text-gray-500">
            Restaurant
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-[#17211D]">
            {restaurantName || "Restaurant"}
          </p>

          <p className="mt-1 text-xs capitalize text-gray-500">
            {role || "User"}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {visibleNavigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#FFF0EB] text-[#E4572E]"
                  : "text-gray-600 hover:bg-[#F7F5F0] hover:text-[#17211D]"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {role === "owner" && (
        <div className="border-t border-[#E5E1D8] p-4">
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium ${
                isActive
                  ? "bg-[#FFF0EB] text-[#E4572E]"
                  : "text-gray-600 hover:bg-[#F7F5F0] hover:text-[#17211D]"
              }`
            }
          >
            Settings
          </NavLink>
        </div>
      )}
    </aside>
  );
}