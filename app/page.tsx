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
import { SectionHeader } from "../src/components/ui/SectionHeader";

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
      <section className="container-max py-16">
        <SectionHeader 
          title="Recommended for You" 
          viewAllLink="/movies" 
        />

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-10"
        >
          {movies.map((movie, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <MovieCard {...movie} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trending Section */}
      {/* Trending Section */}
      <section className="container-max">
        <SectionHeader 
          title="Trending Near You" 
          viewAllLink="/events" 
        />

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-8 overflow-x-auto no-scrollbar pt-10 pb-10 px-6"
        >
          {trendingItems.map((item, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -10 }}
              className="relative w-[300px] h-[210px] flex-shrink-0 group cursor-pointer"
            >
              {/* Slanted Card Container */}
              <div className="w-full h-full rounded-[24px] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 transform -skew-x-12 relative border border-white/50">
                {/* Inner Image Wrapper */}
                <div className="absolute inset-0 w-[130%] h-[130%] -left-[15%] -top-[15%] transform skew-x-12 bg-gray-100">
                  <Image
                    src={item.image}
                    fill
                    priority={i < 2}
                    sizes="300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Trending"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Date Badge - Calendar Style */}
              <div className="absolute -top-5 -right-5 bg-white rounded-[14px] shadow-[0_15px_30px_rgba(37,99,235,0.15)] overflow-hidden z-30 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 border border-blue-50/50">
                <div className="bg-blue-600 px-3 py-1.5 flex items-center justify-center">
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.1em] leading-none">
                    {item.month}
                  </span>
                </div>
                <div className="px-4 py-2.5 flex items-center justify-center bg-white">
                  <span className="text-[22px] font-black text-[#1e293b] leading-none">
                    {item.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

         <div className="py-16">
            <BrowseCategories />
         </div>

         <div className="py-16">
            <TopOffers />
         </div>

         {/* Club Banner */}
         <section className="container-max py-20">
            <div className="w-full max-w-7xl mx-auto ">
               <div className="w-full banner-gradient rounded-[24px] pl-8 md:pl-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl border border-white/5">

                  {/* Decorative Orbs */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                  {/* Left Content */}
                  <div className="relative z-10 flex-1 text-center md:text-left">
                     <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                        Join TicketRoko Club
                     </h2>
                     <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 mb-6">
                        More Points. More Movies.
                     </h3>
                     <p className="text-white/60 text-base md:text-lg mb-10 max-w-md mx-auto md:mx-0 font-medium">
                        Earn points on every booking and unlock exclusive rewards, early access, and special screenings.
                     </p>
                     <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-[#0F172A] px-10 py-4 rounded-2xl font-black text-base hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] transition-all duration-300"
                     >
                        Join Now – It's Free!
                     </motion.button>
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
      <section className="container-max py-20 border-t border-gray-50">
        <SectionHeader 
          title="Explore More" 
          viewAllLink="/explore" 
        />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
               {['Concerts', 'Plays', 'Sports', 'Workshops', 'Family Activities'].map((title, i) => {
                  const localImages = ['/image1.jpg', '/image2.jpg', '/classicmovie.jpg', '/chhava3.jpg', '/chhava4.jpg'];
                  return (
                     <motion.div 
                        key={i} 
                        whileHover={{ y: -12 }}
                        className="relative h-[240px] rounded-[24px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                     >
                        <Image
                           src={localImages[i]}
                           fill
                           sizes="(max-width: 768px) 50vw, 20vw"
                           className="object-cover group-hover:scale-110 transition-transform duration-1000"
                           alt={title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                           <span className="text-white font-black text-xl tracking-tight">{title}</span>
                        </div>
                     </motion.div>
                  );
               })}
            </div>
         </section>

      <Footer />
    </main>
  );
}