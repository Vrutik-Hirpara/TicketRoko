"use client";
import React from "react";
import { HeroBanner } from "../src/components/home/HeroBanner";
import { TopOffers } from "../src/components/home/TopOffers";
import { RecommendedMovies } from "../src/components/home/RecommendedMovies";
import { TrendingEvents } from "../src/components/home/TrendingEvents";
import { ClubBanner } from "../src/components/home/ClubBanner";
import { ExploreMore } from "../src/components/home/ExploreMore";
import { BrowseCategories } from "@/src/components/home/BrowseCategories";

export default function Home() {
  return (
    <main className="">
      <HeroBanner />

      <RecommendedMovies />

      <TrendingEvents />
      <div className="pt-10">
        <BrowseCategories />
      </div>
      <div className="">
        <TopOffers />
      </div>

      <ClubBanner />

      <ExploreMore />
    </main>
  );
}