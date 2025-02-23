'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prof from "../images/pickle.jpg";

import { Crown, Home, ImageIcon, Info, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`bg-white shadow-md fixed w-full text-black border-b border-gray-300 transition-transform duration-300 z-50 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800 flex items-center">
              <Crown className="h-7 w-7 mr-2" />
              <span className="hidden sm:inline">The Main Line Realty</span>
              <span className="sm:hidden">PML Estate</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NavLink href="/properties" icon={<Home className="h-4 w-4 mr-1" />} text="Properties" />
            <NavLink href="/media" icon={<ImageIcon className="h-4 w-4 mr-1" />} text="Blogs/Videos" />
            <NavLink href="/about" icon={<Info className="h-4 w-4 mr-1" />} text="About" />
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex-shrink-0">
              <Link href="/about">
              <Button variant="default">Need an Agent?</Button>
              </Link>
            </div>
            <div className="ml-3 relative">
              <Avatar>
    <Image src={prof} alt="User" width={40} height={40} className="rounded-full" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavLink href="/properties" text="Properties" />
            <MobileNavLink href="/media" text="Blogs/Videos" />
            <MobileNavLink href="/about" text="About Us" />
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Avatar>
        <Image src={prof} alt="User" width={40} height={40} className="rounded-full" />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Profile</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Button variant="default" className="w-full justify-start">
                Need an Agent?
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, icon, text }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
    >
      {icon}
      {text}
    </Link>
  );
}

function MobileNavLink({ href, text }) {
  return (
    <Link
      href={href}
      className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
    >
      {text}
    </Link>
  );
}
