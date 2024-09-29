"use client";
import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import * as XLSX from 'xlsx';

interface LatLong {
    latitude: number;
    longitude: number;
}

export default function Map({ latitude, longitude }: LatLong) {
    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
                version: "weekly",
            });
            const { Map } = await loader.importLibrary("maps");
            const markerLibrary = await loader.importLibrary("marker") as google.maps.MarkerLibrary;
            const position = { lat: latitude, lng: longitude };
            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 12,
                mapId: 'MAP_ID',
            };
            const map = new Map(mapRef.current as HTMLElement, mapOptions);

            // Fetch the Excel file and add markers
            const fileUrl = "/traval-excel.xlsx"; 
            await fetchExcelFile(fileUrl, map, loader, markerLibrary); // Pass markerLibrary here
        };

        initMap();
    }, [latitude, longitude]);

    return <div style={{ height: "100vh", width: "100vw" }} ref={mapRef} />;
}

// Fetch and process Excel file
// Fetch and process Excel file
async function fetchExcelFile(fileUrl: string, map: google.maps.Map, loader: Loader, markerLibrary: google.maps.MarkerLibrary) {
    const response = await fetch(fileUrl);
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0]; // Change to the first sheet if necessary
    const worksheet = workbook.Sheets[firstSheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(`Sheet Data:`, json); // Log the entire sheet data


    // Assuming the Excel sheet has a column "address"
    const addresses = json.map((row: any) => row.Address);
    console.log(`Addresses: ${addresses}`); // Log addresses for debugging

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Geocode and add markers with a delay to avoid rate limits
    for (const address of addresses) {
        if (!address || address.trim() === "") {
            console.error(`Skipping empty or invalid address: ${address}`);
            continue;
        }
        console.log(`Geocoding address: ${address}`);
        await geocodeAddress(loader, address, map, markerLibrary);
        await delay(500); // Adding a delay to avoid rate-limiting issues
    }
}


// Geocode the address and add marker to the map
async function geocodeAddress(loader: Loader, address: string, map: google.maps.Map, markerLibrary: google.maps.MarkerLibrary): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        const { Geocoder } = await loader.importLibrary("geocoding") as google.maps.GeocodingLibrary;
        const geocoder = new Geocoder();

        console.log(`Geocoding address: ${address}`); // Log the address being geocoded
        geocoder.geocode({ address: address }, async (results, status) => {
            if (status === "OK" && results && results[0]) {
                console.log(`Successfully geocoded: ${address}`); // Confirm successful geocoding
                const location = results[0].geometry.location;
                const marker = new markerLibrary.AdvancedMarkerElement({
                    map: map,
                    position: location,
                    title: address
                });

                console.log(`Creating marker for: ${address}`, marker); // Log marker creation

                marker.addListener("click", () => {
                    console.log(`Marker clicked for address: ${address}`);
                });

                resolve();
            } else {
                console.error(`Geocode error for ${address}: ${status}`);
                reject(new Error(status));
            }
        });
    });
}
