import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="border-b border-[#E5E1D8] bg-white">
      <div className="flex h-[72px] items-center justify-between px-6">
        <div>
          <h1 className="text-lg font-bold text-[#17211D]">
            Kathmandu Kitchen
          </h1>

          <p className="text-sm text-gray-500">
            Restaurant dashboard
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="hidden text-sm font-semibold text-[#17211D] hover:text-[#E4572E] sm:block"
          >
            Website
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-[#E5E1D8] bg-white px-4 py-2 text-sm font-semibold text-[#17211D] transition-colors hover:bg-[#F7F5F0]"
          >
            Logout
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17211D] text-sm font-bold text-white">
            S
          </div>
        </div>
      </div>
    </header>
  );
}