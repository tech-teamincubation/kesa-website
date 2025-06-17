import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Image
              src="/kesa_logo.png"
              alt="KESA - Knowledge Enhancement & Skill Acquisition Program"
              width={200}
              height={67}
              className="h-16 w-auto mb-6"
            />
            <p className="text-gray-300 mb-6 max-w-md">
              KESA is dedicated to advancing psychology education through innovative learning experiences, expert-led
              sessions, and comprehensive certification programs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-kesa-blue transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-kesa-purple transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-kesa-red transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-kesa-yellow transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  About KESA
                </a>
              </li>
              <li>
                <a href="#sessions" className="text-gray-300 hover:text-white transition-colors">
                  Sessions
                </a>
              </li>
              <li>
                <a href="#courses" className="text-gray-300 hover:text-white transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#achievements" className="text-gray-300 hover:text-white transition-colors">
                  Achievements
                </a>
              </li>
              <li>
                <Link href="/auth/register" className="text-gray-300 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-3 text-kesa-blue" size={18} />
                <span className="text-gray-300">info@kesalearn.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-kesa-purple" size={18} />
                <span className="text-gray-300">+91 7025000444</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-3 text-kesa-red" size={18} />
                <span className="text-gray-300">Kerala, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 KESA - Knowledge Enhancement & Skill Acquisition Program. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/admin/login" className="text-gray-500 hover:text-gray-400 text-xs transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
