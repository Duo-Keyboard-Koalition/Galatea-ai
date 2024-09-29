"use client";
import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface LatLong {
    latitude: number;
    longitude: number;
}

export default function Map({ latitude, longitude }: LatLong) {
    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string);
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
                version: "weekly",
            });
            const { Map } = await loader.importLibrary("maps");
            const { AdvancedMarkerElement } = await loader.importLibrary("marker") as google.maps.MarkerLibrary;
            const position = { lat: latitude, lng: longitude };
            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 17,
                mapId: 'MAP_ID',
            };
            const map = new Map(mapRef.current as HTMLElement, mapOptions);
            const trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);

            const marker = new AdvancedMarkerElement({
                map: map,
                position: position,
                title: "Your Location"
            });
            marker.addListener("click", () => {
                console.log("Marker clicked");
            });

            // Example usage of geocodeAddress function
            const address = "University of Ottawa";
            geocodeAddress(loader, address)
                .then((location) => {
                    console.log("Geocoded location:", location);
                })
                .catch((error) => {
                    console.error("Geocoding error:", error);
                });
        };

        initMap();
    }, [latitude, longitude]);

    return <div style={{ height: "100vh", width: "100vw" }} ref={mapRef} />;
}

// Function to perform geocoding
async function geocodeAddress(loader: Loader, address: string): Promise<LatLong> {
    return new Promise<LatLong>(async (resolve, reject) => {
        const { Geocoder } = await loader.importLibrary("geocoding") as google.maps.GeocoderLibrary;
        const geocoder = new Geocoder();

        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK" && results[0]) {
                const location = results[0].geometry.location;
                resolve({ latitude: location.lat(), longitude: location.lng() });
            } else {
                reject(new Error(`Geocode was not successful for the following reason: ${status}`));
            }
        });
    });
}