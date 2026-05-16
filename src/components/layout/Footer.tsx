'use client';

import React from 'react';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full footer-gradient border-t border-gray-100 md:pt-20">
      {/* Features Row */}
      <div className="container-max grid grid-cols-1 md:grid-cols-4 gap-4">
        <FeatureItem
          icon="/Safe.svg"
          title="100% Safe Booking"
          desc="Secure & hassle-free transactions"
        />
        <FeatureItem
          icon="/instantConfirmation.svg"
          title="Instant Confirmation"
          desc="Get your tickets in seconds"
        />
        <FeatureItem
          icon="/Offers.svg"
          title="Best Prices"
          desc="Exclusive deals & discounts"
        />
        <FeatureItem
          icon="/Support.svg"
          title="24/7 Support"
          desc="Round-the-clock assistance"
        />
      </div>

      {/* Links Row */}
      <div className="container-max grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[90px]">        <div className="space-y-6">
        <h4 className="font-bold text-gray-900 text-lg">TicketRoko</h4>
        <FooterLinks links={['About Us', 'Careers', 'Press', 'Blog']} />
      </div>
        <div className="space-y-6">
          <h4 className="font-bold text-gray-900 text-lg">Help</h4>
          <FooterLinks links={['FAQs', 'Cancellation Policy', 'Refund Policy', 'Contact Us']} />
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-gray-900 text-lg">Company</h4>
          <FooterLinks links={['Terms & Conditions', 'Privacy Policy', 'Cookie Policy']} />
        </div>
        <div className="space-y-8">
          <h4 className="font-bold text-gray-900 text-lg">Get the App</h4>
          <div className="flex flex-col gap-4">
            <AppButton store="App Store" />
            <AppButton store="Google Play" />
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-gray-900 text-lg">Follow Us</h4>
          <div className="flex gap-2">
            <SocialIcon icon={<FaFacebook className="h-5 w-5" />} color="bg-[#1877F2]" />
            <SocialIcon icon={<FaInstagram className="h-5 w-5" />} color="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" />
            <SocialIcon icon={<FaTwitter className="h-5 w-5" />} color="bg-black" />
            <SocialIcon icon={<FaYoutube className="h-5 w-5" />} color="bg-[#FF0000]" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container-max text-center py-4 sm:py-4 md:py-6 lg:py-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[90px] border-t border-gray-200/60">        <p className="text-sm text-gray-800 font-medium tracking-wide">
        © 2025 TicketRoko. Built for the best experience. All rights reserved.
      </p>
      </div>
    </footer>
  );
};

const FeatureItem = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-primary group cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-2 bg-[#F9FAFB] rounded-xl flex items-center justify-center shrink-0 w-12 h-12 group-hover:bg-white/20 transition-all duration-500">
        <Image
          src={icon}
          alt={title}
          width={32}
          height={32}
          className="object-contain transition-all duration-500"
          quality={100}
          unoptimized
          style={{
            filter: isHovered
              ? 'brightness(0) invert(1)'
              : 'invert(27%) sepia(91%) saturate(2352%) hue-rotate(211deg) brightness(95%) contrast(93%)'
          }}
        />
      </div>
      <div>
        <h5 className="font-bold text-[#111827] text-sm group-hover:text-white transition-colors duration-500">{title}</h5>
        <p className="text-gray-800 text-xs group-hover:text-white/80 transition-colors duration-500">{desc}</p>
      </div>
    </div>
  );
};




const FooterLinks = ({ links }: { links: string[] }) => (
  <ul className="space-y-2">
    {links.map((link) => (
      <li key={link}>
        <Link href="#" className="text-gray-800 text-sm font-md  transition-all link-underline inline-block">
          {link}
        </Link>
      </li>
    ))}
  </ul>
);

const AppButton = ({ store }: { store: string }) => (
  <button className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-1 py-2 rounded-lg transition-all duration-300 w-full max-w-[140px]">
    {/* Apple Logo / Play Store Icon */}
    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
      {store === 'App Store' ? (
        <svg className="w-5 h-5 text-white" viewBox="0 0 384 512" fill="currentColor">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.7-17.6-79.4-17.8-42.5 0-82.4 26.7-103.5 68.2-37.8 71.6-9.4 171.4 26.6 221.6 18.8 26.3 41.2 55 72.5 53.3 28.9-1.6 40.2-18.6 74.9-18.6 34.7 0 45.4 18.6 75.3 17.9 31.8-.7 52.2-25.9 71-52.4 22.2-31 31.1-62 31.1-62.2-68-26.6-78.1-123.9-18.7-162.4zM256 96c16.3 0 36.8-10.8 50.9-29.7 14.9-20 20.6-43.8 18.9-66.3-25.9 1.8-54.1 18.8-71.2 41.1-14.7 19.1-22.9 42.8-21.4 66 23.5 1.4 45.8-12.1 62.8-28.1z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-white" viewBox="0 0 512 512" fill="currentColor">
          <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
        </svg>
      )}
    </div>

    {/* Text Content - Centered vertically and horizontally */}
    <div className="text-left">
      <p className="text-[9px] leading-tight text-gray-400 font-medium">
        {store === 'App Store' ? 'Download on the' : 'GET IT ON'}
      </p>
      <p className="text-sm font-semibold leading-tight mt-0.5">
        {store === 'App Store' ? 'App Store' : 'Google Play'}
      </p>
    </div>
  </button>
);

const SocialIcon = ({ icon, color }: { icon: React.ReactNode, color: string }) => (
  <Link href="#" className={`${color} text-white p-2 rounded-full hover:scale-110 transition-transform`}>
    {icon}
  </Link>
);

