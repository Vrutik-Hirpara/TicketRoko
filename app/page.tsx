"use client";
import React from "react";
import { HeroBanner } from "../src/components/home/HeroBanner";
import { TopOffers } from "../src/components/home/TopOffers";
import { RecommendedMovies } from "../src/components/home/RecommendedMovies";
import { AdBanner } from "../src/components/home/AdBanner";
import { TrendingEvents } from "../src/components/home/TrendingEvents";
import { ClubBanner } from "../src/components/home/ClubBanner";
import { ExploreMore } from "../src/components/home/ExploreMore";
import { BrowseCategories } from "@/src/components/home/BrowseCategories";
import { ActiveCategoryEvents } from "../src/components/home/ActiveCategoryEvents";
import { ActiveCityEvents } from "../src/components/home/ActiveCityEvents";

export default function Home() {
  return (
    <main className="">
      <HeroBanner />

      <RecommendedMovies />

      <AdBanner />

      <TrendingEvents />
      <div className="pt-10">
        <BrowseCategories />
      </div>

      <ActiveCategoryEvents />

      <ActiveCityEvents />

      <div className="">
        <TopOffers />
      </div>

      <ClubBanner />

      <ExploreMore />
    </main>
  );
}

//ndskjnckjdsnckjdsncdkxjc