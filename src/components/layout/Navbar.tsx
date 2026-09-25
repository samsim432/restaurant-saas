import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E1D8] bg-[#FCFAF6]/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-[#17211D]"
        >
          Restaurant<span className="text-[#E4572E]">OS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/features"
            className="text-sm font-medium text-[#17211D] transition-colors hover:text-[#E4572E]"
          >
            Features
          </Link>

          <Link
            to="/pricing"
            className="text-sm font-medium text-[#17211D] transition-colors hover:text-[#E4572E]"
          >
            Pricing
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-[#17211D] transition-colors hover:text-[#E4572E]"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="text-sm font-medium text-[#17211D] transition-colors hover:text-[#E4572E]"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-sm font-semibold text-[#17211D] hover:text-[#E4572E] sm:block"
          >
            Login
          </Link>

          <Link to="/get-started">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}