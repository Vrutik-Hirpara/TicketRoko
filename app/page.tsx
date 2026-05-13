"use client";
import Image from "next/image";
import { Navbar } from "../src/components/layout/Navbar";
import { CategoryNav } from "../src/components/layout/CategoryNav";
import { HeroBanner } from "../src/components/home/HeroBanner";
import { MovieCard } from "../src/components/ui/MovieCard";
import { Footer } from "../src/components/layout/Footer";
import { BrowseCategories } from "../src/components/home/BrowseCategories";
import { TopOffers } from "../src/components/home/TopOffers";
import { ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const movies = [
   {
      title: "Tanu Weds Manu Returns",
      genre: "Comedy • Drama",
      rating: 8.2,
      imageUrl: "/chhava1.jpg"
   },
   {
      title: "Bhool Bhulaiyaa 3",
      genre: "Horror • Comedy",
      rating: 7.8,
      imageUrl: "/chhava2.jpg"
   },
   {
      title: "Hera Pheri 3",
      genre: "Comedy",
      rating: 8.3,
      imageUrl: "/chhava3.jpg"
   },
   {
      title: "Singham Again",
      genre: "Action • Crime",
      rating: 7.7,
      imageUrl: "/chhava4.jpg"
   },
   {
      title: "Gadar 2",
      genre: "Action • Drama",
      rating: 9.0,
      imageUrl: "/gadar2.jpg"
   }
];

// Explore More categories with local images
const exploreCategories = [
   { title: "Concerts", image: "/chhava1.jpg" },
   { title: "Plays", image: "/chhava2.jpg" },
   { title: "Sports", image: "/chhava3.jpg" },
   { title: "Workshops", image: "/chhava4.jpg" },
   { title: "Family Activities", image: "/gadar2.jpg" }
];

// Trending items data
const trendingItems = [
   { title: "Arijit Singh Concert", venue: "EKA Arena, Ahmedabad", date: "24", month: "May", image: "/image1.jpg" },
   { title: "Sunburn Festival", venue: "GMDC Ground, Ahmedabad", date: "15", month: "Dec", image: "/image2.jpg" },
   { title: "Comedy Express", venue: "The Laugh Store, Mumbai", date: "10", month: "Jun", image: "/image1.jpg" },
   { title: "IPL 2025 Final", venue: "Narendra Modi Stadium", date: "28", month: "May", image: "/image2.jpg" },
   { title: "Stand-up Special", venue: "Canvas Laugh Club", date: "05", month: "Jul", image: "/image1.jpg" },
];

export default function Home() {
   return (
      <main className="min-h-screen bg-white pt-[76px]">
         <CategoryNav />

         {/* Added vertical margin between tabs and banner */}
         <div className="">
            <HeroBanner />
         </div>

         {/* Recommended Section */}
         <section className="container-max">
            <div className="flex items-center justify-between">
               <h2 className="text-[28px] font-black text-[#111827] flex items-center gap-3">
                  <span className="w-1.5 h-10 bg-[#2563EB] rounded-full inline-block"></span>
                  Recommended for You
               </h2>
               <button className="text-[#2563EB] text-[15px] font-bold flex items-center gap-1 hover:underline group">
                  View All <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 my-8">
               {movies.map((movie, idx) => (
                  <MovieCard key={idx} {...movie} />
               ))}
            </div>
         </section>

         {/* Trending Section */}
         {/* Trending Section */}
         <section className="container-max">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-[28px] font-black text-[#111827] flex items-center gap-3">
                  <span className="w-1.5 h-10 bg-[#2563EB] rounded-full inline-block"></span>
                  Trending Near You
               </h2>
               <button className="text-[#2563EB] text-[15px] font-bold flex items-center gap-1 hover:underline group">
                  View All <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>

            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 px-6">
               {trendingItems.map((item, i) => (
                  <div key={i} className="relative w-[280px] h-[200px] flex-shrink-0 group cursor-pointer">
                     {/* Slanted Card Container */}
                     <div className="w-full h-full rounded-[12px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform -skew-x-12 relative border border-gray-100">
                        {/* Inner Image Wrapper - Reverse skew to keep image straight, scale to cover corners */}
                        <div className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] transform skew-x-12 bg-gray-100">
                           <Image
                              src={item.image}
                              fill
                              priority={i < 2}
                              sizes="(max-width: 768px) 100vw, 280px"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              alt="Trending"
                           />
                        </div>
                     </div>

                     {/* Date Badge - Unskewed, positioned top-right overlapping the corner */}
                     <div className="absolute -top-3 -right-6 bg-white rounded-lg shadow-2xl w-14 h-16 flex flex-col items-center justify-center border border-gray-100">
                        <span className="text-[22px] font-black text-gray-900 leading-none">
                           {item.date}
                        </span>

                        <span className="text-[10px] font-bold text-gray-500 uppercase mt-1 tracking-widest leading-none">
                           {item.month}
                        </span>

                     </div>
                  </div>
               ))}
            </div>
         </section>

         <div className="">
            <BrowseCategories />
         </div>

         <div className="">
            <TopOffers />
         </div>

         {/* Club Banner */}
         <section className="container-max py-24">
            <div className="w-full max-w-7xl mx-auto ">
               <div className="w-full bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[12px] pl-8 md:pl-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">

                  {/* Decorative Orbs */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                  {/* Left Content */}
                  <div className="relative z-10 flex-1 text-center md:text-left">
                     <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        Join TicketRoko Club
                     </h2>
                     <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                        More Points. More Movies.
                     </h3>
                     <p className="text-white/80 text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0">
                        Earn points on every booking and unlock exclusive rewards, early access, and special screenings.
                     </p>
                     <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-base hover:shadow-lg hover:scale-105 transition-all duration-300">
                        Join Now – It's Free!
                     </button>
                  </div>

                  {/* Right Image - Gift Card */}
                  <div className="relative z-10 mt-32 md:mt-24 ml-8 md:ml-14">
                     <div className="relative w-[360px] h-[260px] md:w-[430px] md:h-[340px]">
                        <Image
                           src="/giftcard.png"
                           alt="TicketRoko Club Card"
                           fill
                           className="object-contain"
                           priority
                        />
                     </div>
                  </div>

               </div>
            </div>
         </section>

         {/* Explore More Section */}
         <section className="container-max py-12 mb-12">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-bold text-[#111827]">Explore More</h2>
               <button className="text-primary text-sm font-bold">View All &rsaquo;</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
               {['Concerts', 'Plays', 'Sports', 'Workshops', 'Family Activities'].map((title, i) => {
                  const localImages = ['/image1.jpg', '/image2.jpg', '/classicmovie.jpg', '/chhava3.jpg', '/chhava4.jpg'];
                  return (
                     <div key={i} className="relative h-[180px] rounded-2xl overflow-hidden group cursor-pointer">
                        <Image
                           src={localImages[i]}
                           fill
                           sizes="(max-width: 768px) 50vw, 20vw"
                           className="object-cover group-hover:scale-110 transition-transform duration-500"
                           alt={title}
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-end p-4">
                           <span className="text-white font-bold">{title}</span>
                        </div>
                     </div>
                  );
               })}
            </div>
         </section>

         <Footer />
      </main>
   );
}