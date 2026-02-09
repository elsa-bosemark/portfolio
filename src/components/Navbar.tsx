import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 h-16">
        <Link
          to="/"
          className="text-lg font-display text-foreground hover:text-primary transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Elsa Bosemark
        </Link>

        <div className="flex items-center gap-8">
          <button
            onClick={() => scrollToSection("work")}
            className="text-xs font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-xs font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-xs font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
