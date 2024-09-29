"use client";
import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import * as XLSX from 'xlsx';
import './Map.css'; // Import the CSS file

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
            const position = { lat: latitude, lng: longitude };
            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 12,
                mapId: 'MAP_ID',
            };
            const map = new Map(mapRef.current as HTMLElement, mapOptions);

            // Example markers
            const markers = [
                { position: { lat: latitude, lng: longitude } },
                // Add more marker positions here
            ];

            // Add markers lazily
            map.addListener('idle', () => {
                markers.forEach(markerData => {
                    new google.maps.Marker({
                        position: markerData.position,
                        map: map,
                    });
                });
            });
        };

        initMap();
    }, [latitude, longitude]);

    return (
        <div className="map-container">
            <div className="map-title">Map of Locations</div>
            <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
        </div>
    );
}
// Fetch and process Excel file
async function fetchExcelFile(fileUrl: string, map: google.maps.Map, loader: Loader, markerLibrary: google.maps.MarkerLibrary) {
    const response = await fetch(fileUrl);
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
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
        await geocodeAddress(loader, address, map, markerLibrary);
        await delay(500); // Adding a delay to avoid rate-limiting issues
    }
}


// Geocode the address and add marker to the map
async function geocodeAddress(loader: Loader, address: string, map: google.maps.Map, markerLibrary: google.maps.MarkerLibrary): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        const { Geocoder } = await loader.importLibrary("geocoding") as google.maps.GeocodingLibrary;
        const geocoder = new Geocoder();

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
