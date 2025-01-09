import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import logo from "../../../assets/Logo.png";
import darkLogo from "../../../assets/logoDark.png";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { Link } from "react-router-dom";

type NavItem = {
  id: string;
  label: string;
};

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const { theme, toggleTheme } = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const homeSection = document.getElementById("home");
      const aboutSection = document.getElementById("about");
      const faqSection = document.getElementById("faq");

      if (!homeSection || !aboutSection || !faqSection) return;

      if (scrollPosition < aboutSection.offsetTop - 100) {
        setActiveSection("home");
      } else if (scrollPosition < faqSection.offsetTop - 100) {
        setActiveSection("about");
      } else {
        setActiveSection("faq");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });

    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const navItems: NavItem[] = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "faq", label: "FAQs" },
  ];

  return (
    <nav className="fixed w-full md:w-full lg:max-w-screen-xl mx-auto z-50 bg-theme-blue dark:bg-theme-black shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            {theme === "dark" ? (
              <img src={darkLogo} alt="Logo" className="w-28" />
            ) : (
              <img src={logo} alt="Logo" className="w-28" />
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    px-3 py-2 rounded-md text-xs md:text-md lg:text-xl font-medium
                    ${
                      activeSection === item.id
                        ? "underline text-theme-dark-blue dark:text-theme-blue underline-offset-8"
                        : "text-white hover:underline underline-offset-8"
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div>
              <Link to="/Auth">
                <button className="border text-white py-2 px-3 rounded-md dark:text-theme-blue dark:border-theme-blue">
                  LOGIN
                </button>
              </Link>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white dark:bg-theme-black hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >
              {theme === "dark" ? (
                <Icon icon="ph:sun-bold" className="text-white w-7 h-7" />
              ) : (
                <Icon icon="jam:moon-f" className="text-theme-blue w-7 h-7" />
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center justify-between">
            {/* Dark Mode Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white dark:bg-theme-black hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >
              {theme === "dark" ? (
                <Icon icon="ph:sun-bold" className="text-white w-7 h-7" />
              ) : (
                <Icon icon="jam:moon-f" className="text-theme-blue w-7 h-7" />
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Open main menu"
            >
              <Icon
                icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"}
                className="w-8 h-8 text-white dark:text-theme-blue"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 bg-theme-blue dark:bg-theme-black shadow-md">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    block w-full text-left px-3 py-2 rounded-md text-base font-medium
                    ${
                      activeSection === item.id
                        ? "underline text-theme-dark-blue underline-offset-8"
                        : "text-gray-300 hover:underline underline-offset-8"
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
              <Link to="/Auth">
                <button className="border text-white py-2 px-3 rounded-md dark:text-theme-blue dark:border-theme-blue">
                  LOGIN
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
