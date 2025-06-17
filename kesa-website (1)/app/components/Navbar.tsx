"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#sessions", label: "Sessions" },
    { href: "#courses", label: "Courses" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/kesa_logo.png"
              alt="KESA - Knowledge Enhancement & Skill Acquisition Program"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* User Account */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/auth/login"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isScrolled ? "text-blue-600 hover:text-blue-800" : "text-white hover:text-blue-200"
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${isScrolled ? "text-gray-700" : "text-white"}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t pt-4 mt-4">
              <Link href="/auth/login" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600">
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white mt-2"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
