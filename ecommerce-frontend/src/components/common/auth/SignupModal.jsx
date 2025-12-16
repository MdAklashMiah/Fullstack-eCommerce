"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, User, Heart, ShoppingCart } from "lucide-react";
import Container from "./Container";
import SearchBar from "./SearchBar";

import LoginModal from "./auth/LoginModal";
import SignupModal from "./auth/SignupModal";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("HOME");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // ESC key closes modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsLoginOpen(false);
        setIsSignupOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const navLinks = ["HOME", "SHOP", "COLLECTION", "CONTACT", "ABOUT US"];

  const getPath = (link) =>
    link === "HOME" ? "/" : `/${link.toLowerCase()}`;

  return (
    <header className="w-full shadow-sm bg-secondary fixed top-0 left-0 z-999 pb-5">
      <Container>
        <div className="w-full mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <img src="/images/logo.png" alt="logo" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={getPath(link)}
                onClick={() => setActive(link)}
                className={`relative ${
                  active === link
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-gray-200">
            <button onClick={() => setIsLoginOpen(true)}>
              <User className="w-5 h-5 hover:text-white" />
            </button>

            <Heart className="w-5 h-5 hover:text-white" />

            <div className="relative cursor-pointer">
              <ShoppingCart className="w-5 h-5 hover:text-white" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Menu
                className="w-6 h-6 cursor-pointer"
                onClick={() => setMobileOpen(true)}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Search Bar */}
      <Container>
        <SearchBar />
      </Container>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        openSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        openLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </header>
  );
};

export default Header;
