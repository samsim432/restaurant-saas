import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Orders", path: "/dashboard/orders" },
  { label: "Tables", path: "/dashboard/tables" },
  { label: "Menu", path: "/dashboard/menu" },
  { label: "Payments", path: "/dashboard/payments" },
  { label: "Staff", path: "/dashboard/staff" },
  { label: "Reports", path: "/dashboard/reports" },
];

export default function Sidebar() {
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
            Kathmandu Kitchen
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Kathmandu, Nepal
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => (
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
    </aside>
  );
}