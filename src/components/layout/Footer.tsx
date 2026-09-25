import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#17211D] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="text-xl font-bold">
              Restaurant<span className="text-[#E4572E]">OS</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-300">
              Restaurant ordering and operations software built for modern
              restaurants in Nepal.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Product</h3>

            <div className="mt-4 space-y-3 text-sm text-gray-300">
              <Link
                className="block hover:text-white"
                to="/features"
              >
                Features
              </Link>

              <Link
                className="block hover:text-white"
                to="/pricing"
              >
                Pricing
              </Link>

              <Link
                className="block hover:text-white"
                to="/get-started"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Company</h3>

            <div className="mt-4 space-y-3 text-sm text-gray-300">
              <Link
                className="block hover:text-white"
                to="/about"
              >
                About
              </Link>

              <Link
                className="block hover:text-white"
                to="/contact"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Account</h3>

            <div className="mt-4 space-y-3 text-sm text-gray-300">
              <Link
                className="block hover:text-white"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="block hover:text-white"
                to="/register"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} RestaurantOS. All rights reserved.
          </p>

          <p>
            Built for restaurants in Nepal.
          </p>
        </div>
      </div>
    </footer>
  );
}