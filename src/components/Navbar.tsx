// components/Navbar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const infoPages = [
  { label: "Real Estate Basics", href: "/realStateBasic" },
  { label: "Property Types", href: "/propertyType" },
  { label: "Legal Guidance", href: "/legalGuidance" },
  { label: "Market Trends", href: "/marketTrends" },
  { label: "First Time Buyers", href: "/firstTimeBuyers" },
  { label: "Selling Tips", href: "/sellingTips" },
  { label: "Rental Advice", href: "/rentalAdvice" },
  { label: "Home Loans", href: "/homeLoans" },
  { label: "Investments", href: "/investements" },
  { label: "Tax Insights", href: "/taxInsights" },
  { label: "Renovation Tips", href: "/renovationTips" },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "Smart Homes", href: "/smartHomes" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Co-Living", href: "/coLiving" },
];

const moreInfoItems = [
  { label: "About", href: "/about" },
  { label: "CSR (Corporate Social Responsibility)", href: "/csr" },
  { label: "Vision & Mission", href: "/vision" },
  { label: "Career", href: "/career" },
  { label: "Events", href: "/events" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [submenu, setSubmenu] = React.useState<string | null>(null);

  return (
    <>
      <nav className="w-full bg-[#0f172a] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="Logo" width={70} height={70} />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/" label="Home" />
            <NavLink href="/properties" label="Properties" />
            <NavLink href="/contact" label="Contact Us" />
            <Dropdown label={<span className="flex items-center gap-1">Information Hub <ChevronRight size={16} /></span>} items={infoPages} />
            <Dropdown label={<span className="flex items-center gap-1">More Info <ChevronRight size={16} /></span>} items={moreInfoItems} />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link href="/pages/contact" className="text-[#FFD700] border border-[#FFD700] rounded-full px-3 py-1 text-sm font-semibold">
              Contact Us
            </Link>
            <button onClick={() => { setIsOpen(true); setSubmenu(null); }}>
              <Menu size={28} color="#FFD700" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black backdrop-blur-md z-40"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white/10 backdrop-blur-xl text-white z-50 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <Image src="/images/logo.png" alt="Logo" width={80} height={80} />
                <X size={28} onClick={() => setIsOpen(false)} className="cursor-pointer" />
              </div>

              {submenu ? (
                <div>
                  <div className="flex items-center gap-2 cursor-pointer mb-4" onClick={() => setSubmenu(null)}>
                    <ArrowLeft size={20} />
                    <span className="text-sm font-medium">Back</span>
                  </div>
                  <div className="space-y-3 text-base font-semibold">
                    {(submenu === 'info' ? infoPages : moreInfoItems).map((item, i) => (
                      <Link key={i} href={item.href} className="block hover:text-[#60a5fa]">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-lg font-semibold">
                  <MobileLink href="/" label="Home" />
                  <MobileLink href="/properties" label="Properties" />
                  <MobileLink href="/contact" label="Contact Us" />
                  <div onClick={() => setSubmenu('info')} className="cursor-pointer flex justify-between items-center">
                    <span>Information Hub</span>
                    <ChevronRight size={18} />
                  </div>
                  <div onClick={() => setSubmenu('more')} className="cursor-pointer flex justify-between items-center">
                    <span>More Info</span>
                    <ChevronRight size={18} />
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Buttons */}
      <div className="fixed bottom-0 left-0 w-full py-2 flex items-center justify-between md:hidden backdrop-blur-lg bg-black/40 z-50">
        <button className="flex-1 mx-1 py-3 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white bg-[#25D366] shadow-md hover:opacity-90 transition">
          <FaWhatsapp size={20} /> WhatsApp
        </button>
        <button className="flex-1 mx-1 py-3 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white bg-[#1DA1F2] shadow-md hover:opacity-90 transition">
          <FaEnvelope size={20} /> Enquiry
        </button>
        <button className="flex-1 mx-1 py-3 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white bg-[#FF3B30] shadow-md hover:opacity-90 transition">
          <FaPhoneAlt size={20} /> Call
        </button>
      </div>

      {/* Desktop Floating Buttons */}
      <div className="hidden md:flex flex-col fixed bottom-4 left-4 gap-3 z-40">
        <button className="px-4 py-2 bg-[#25D366] text-white rounded-md flex items-center gap-2">
          <FaWhatsapp /> WhatsApp
        </button>
        <button className="px-4 py-2 bg-[#1DA1F2] text-white rounded-md flex items-center gap-2">
          <FaEnvelope /> Enquiry
        </button>
        <button className="px-4 py-2 bg-[#FF3B30] text-white rounded-md flex items-center gap-2">
          <FaPhoneAlt /> Call
        </button>
      </div>

      {/* Desktop Floating Social Icons */}
      <div className="hidden md:flex flex-col fixed top-1/3 left-2 gap-4 z-40 text-blue-900 text-2xl">
        <a href="#" className="hover:text-[#C13584]" aria-label="Instagram"><FaInstagram /></a>
        <a href="#" className="hover:text-[#3b5998]" aria-label="Facebook"><FaFacebookF /></a>
        <a href="#" className="hover:text-[#FF0000]" aria-label="YouTube"><FaYoutube /></a>
        <a href="#" className="hover:text-[#0077B5]" aria-label="LinkedIn"><FaLinkedinIn /></a>
      </div>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-base font-medium hover:text-[#93c5fd] whitespace-nowrap">
      {label}
    </Link>
  );
}

function Dropdown({ label, items }: { label: React.ReactNode; items: { label: string; href: string }[] }) {
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative group"
      onMouseEnter={() => dropdownRef.current?.classList.remove("hidden")}
      onMouseLeave={() => dropdownRef.current?.classList.add("hidden")}
    >
      <div className="cursor-pointer text-base font-medium hover:text-[#93c5fd] flex items-center gap-1">
        {label}
      </div>
      <div
        ref={dropdownRef}
        className="absolute top-full left-0 grid grid-cols-2 gap-4 bg-white text-black p-4 mt-2 rounded-lg shadow-lg min-w-[300px] z-30"
      >
        {items.map((item, i) => (
          <Link key={i} href={item.href} className="hover:text-[#1e3a8a] text-sm font-semibold">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="block hover:text-[#60a5fa]">
      {label}
    </Link>
  );
}
