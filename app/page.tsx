"use client";
import React from "react";
import { Navbar } from "../src/components/layout/Navbar";
import { CategoryNav } from "../src/components/layout/CategoryNav";
import { HeroBanner } from "../src/components/home/HeroBanner";
import { Footer } from "../src/components/layout/Footer";
import { TopOffers } from "../src/components/home/TopOffers";
import { RecommendedMovies } from "../src/components/home/RecommendedMovies";
import { TrendingEvents } from "../src/components/home/TrendingEvents";
import { ClubBanner } from "../src/components/home/ClubBanner";
import { ExploreMore } from "../src/components/home/ExploreMore";
import { BrowseCategories } from "@/src/components/home/BrowseCategories";

export default function Home() {
  return (
    <main className="min-h-screen bg-white pt-[76px]">
      <CategoryNav />

      <HeroBanner />

      <RecommendedMovies />

      <TrendingEvents />
      <div className="py-16">
        <BrowseCategories />
      </div>
      <div className="pb-16">
        <TopOffers />
      </div>

      <ClubBanner />

      <ExploreMore />

      <Footer />
    </main>
  );
}