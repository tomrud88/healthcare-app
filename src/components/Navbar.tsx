import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkClasses = (path: string) =>
    `relative px-4 py-2 rounded-2xl font-medium transition-all duration-300 ${
      pathname === path
        ? "bg-ds-bg-highlight shadow-inner-glow"
        : "text-ds-text-body hover:bg-ds-bg-highlight/50"
    }` + (pathname === path ? " active-link" : "");

  return (
    <nav className="sticky top-0 bg-ds-white/90 backdrop-blur-md shadow-modern z-50 border-b border-ds-gray/20">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300"
            style={{
              background: "linear-gradient(135deg, #5B73FF 0%, #445CE0 100%)",
            }}
          >
            N
          </div>
          <span
            className="text-2xl font-bold"
            style={{
              background: "linear-gradient(90deg, #5B73FF 0%, #445CE0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            NextGen Doctor
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2 bg-ds-light-gray/50 p-2 rounded-3xl">
          <Link
            to="/"
            className={linkClasses("/")}
            style={{ color: pathname === "/" ? "#5B73FF" : "#6B7280" }}
          >
            Home
          </Link>
          <Link
            to="/doctors"
            className={linkClasses("/doctors")}
            style={{ color: pathname === "/doctors" ? "#5B73FF" : "#6B7280" }}
          >
            Doctors
          </Link>
          <Link
            to="/services"
            className={linkClasses("/services")}
            style={{ color: pathname === "/services" ? "#5B73FF" : "#6B7280" }}
          >
            Services
          </Link>
          <Link
            to="/about"
            className={linkClasses("/about")}
            style={{ color: pathname === "/about" ? "#5B73FF" : "#6B7280" }}
          >
            About
          </Link>
          <Link
            to="/profile"
            className={linkClasses("/profile")}
            style={{ color: pathname === "/profile" ? "#5B73FF" : "#6B7280" }}
          >
            👤 Profile
          </Link>
        </div>

        <Link
          to="/doctors"
          className="group relative px-6 py-3 rounded-2xl transition-all duration-300 shadow-modern hover:shadow-modern-hover font-semibold overflow-hidden"
          style={{
            backgroundColor: "#5B73FF",
            color: "white",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#445CE0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#5B73FF";
          }}
        >
          <span className="relative z-10">Book Now</span>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(90deg, #445CE0 0%, #3346B3 100%)",
            }}
          ></div>
        </Link>
      </div>
    </nav>
  );
}
