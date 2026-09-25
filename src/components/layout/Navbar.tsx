import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";

const navLinks = [
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E2D8] bg-[#FCFAF6]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4572E] text-white font-bold">
            R
          </div>

          <span className="text-xl font-bold tracking-tight text-[#17211D]">
            Restaurant<span className="text-[#E4572E]">OS</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-[#E4572E]"
                    : "text-[#17211D] hover:text-[#E4572E]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#E4572E] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="text-sm font-semibold text-[#17211D] transition hover:text-[#E4572E]"
          >
            Login
          </Link>

          <Link to="/get-started">
            <Button>Get Started</Button>
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-[#17211D] transition hover:bg-[#F3EEE5] md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-[#E8E2D8] bg-[#FCFAF6]/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#E4572E]/10 text-[#E4572E]"
                    : "text-[#17211D] hover:bg-[#F3EEE5]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="mt-5 flex flex-col gap-3 border-t border-[#E8E2D8] pt-5">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg border border-[#D7D1C8] px-4 py-3 text-center text-sm font-semibold text-[#17211D] transition hover:bg-[#F3EEE5]"
            >
              Login
            </Link>

            <Link
              to="/get-started"
              onClick={() => setMobileOpen(false)}
            >
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}