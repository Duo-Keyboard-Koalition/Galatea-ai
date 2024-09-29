"use client";
import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import * as XLSX from "xlsx";
import "./Map.css"; // Import the CSS file
import axios from "axios";

interface LatLong {
  latitude: number;
  longitude: number;
}

export default function Map({ latitude, longitude }: LatLong) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });
      const { Map } = await loader.importLibrary("maps");
      const markerLibrary = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const position = { lat: latitude, lng: longitude };
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 12,
        mapId: "MAP_ID",
      };
      const map = new Map(mapRef.current as HTMLElement, mapOptions);

      const userPin = document.createElement("div");
      userPin.innerHTML = `
        <svg width="15" height="20" viewBox="0 0 20 30" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0C16.6 0 20 5.4 20 10C20 18 10 30 10 30C10 30 0 18 0 10C0 5.4 3.4 0 10 0Z" fill="#0000FF"/>
        </svg>
      `;
      userPin.style.position = "absolute";
      userPin.style.transform = "translate(-50%, -100%)";

      const userMarker = new markerLibrary.AdvancedMarkerElement({
        map: map,
        position: position,
        content: userPin,
        title: "Your Location",
      });

      const fileUrl = "/traval-excel.xlsx";
      await fetchExcelFile(fileUrl, map, loader, markerLibrary, handleMarkerClick);
    };

    initMap();
  }, [latitude, longitude]);

  const handleMarkerClick = (location: string) => {
    setSelectedLocation(location);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="map-container">
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={closeSidebar}>
          &times;
        </button>
        <div className="sidebar-content">
          <h3>Location Details</h3>
          <p>{selectedLocation}</p>
        </div>
      </div>
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}

// Fetch data from Excel file and process
async function fetchExcelFile(
  fileUrl: string,
  map: google.maps.Map,
  loader: Loader,
  markerLibrary: google.maps.MarkerLibrary,
  onMarkerClick: (address: string) => void
) {
  const response = await fetch(fileUrl);
  const data = await response.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const firstSheetName = workbook.SheetNames[0]; 
  const worksheet = workbook.Sheets[firstSheetName];
  const json = XLSX.utils.sheet_to_json(worksheet);
  
  // Assuming the Excel sheet has a column "address"
  const addresses = json.map((row: any) => row.Address);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Geocode and add markers with a delay to avoid rate limits
  for (const address of addresses) {
    if (!address || address.trim() === "") {
      console.error(`Skipping empty or invalid address: ${address}`);
      continue;
    }
    await geocodeAddress(loader, address, map, markerLibrary, onMarkerClick);
    await delay(500); // Adding a delay to avoid rate-limiting issues
  }
}

// Geocode the address and add marker to the map
async function geocodeAddress(
    loader: Loader,
    address: string,
    map: google.maps.Map,
    markerLibrary: google.maps.MarkerLibrary,
    onClick: (location: string) => void
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const { Geocoder } = (await loader.importLibrary(
        "geocoding"
      )) as google.maps.GeocodingLibrary;
      const geocoder = new Geocoder();
  
      geocoder.geocode({ address: address }, async (results, status) => {
        if (status === "OK" && results && results[0]) {
          const location = results[0].geometry.location;
          const marker = new markerLibrary.AdvancedMarkerElement({
            map: map,
            position: location,
            title: address,
          });
  
          marker.addListener("click", () => {
            onClick(address); // Open the sidebar with location details
          });
  
          resolve();
        } else {
          reject(new Error(status));
        }
      });
    });
  }