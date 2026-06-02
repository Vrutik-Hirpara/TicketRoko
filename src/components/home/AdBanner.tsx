'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getFullImageUrl, BASE_URL } from "../../utils/constants";

export const AdBanner = () => {
  const [adData, setAdData] = useState<any>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(`${BASE_URL}/advertisements`);
        const json = await res.json();
        if (json.success && json.data) {
          // If the backend returns an array, pick the first one, else use the object directly
          const data = Array.isArray(json.data) ? json.data[0] : json.data;
          setAdData(data);
        }
      } catch (error) {
        console.error("Failed to fetch advertisement", error);
      }
    };
    fetchAd();
  }, []);

  if (!adData) return null;

  return (
    <div className="container-max pb-10">
      <a 
        href={adData.thumbnail_url ? getFullImageUrl(adData.thumbnail_url) : adData.url_link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full relative overflow-hidden rounded-[10px] block cursor-pointer"
      >
        {/* Using a standard img tag with w-full ensures it stretches/fits naturally based on aspect ratio like BookMyShow */}
        <img
          src={getFullImageUrl(adData.image_url)}
          alt={adData.title || "Advertisement"}
          className="w-full h-[97px] object-cover"
        />
      </a>
    </div>
  );
};
