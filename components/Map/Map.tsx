'use client';

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

interface Location {
  streetNumber: string;
  street: string;
  postcode: string;
  city: string;
  state: string;
  title?: string;
}

interface MapProps {
  locations: Location[];
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement(document.getElementById('root'));

const Map: React.FC<MapProps> = ({ locations }) => {
  const [geocodedLocations, setGeocodedLocations] = useState<google.maps.LatLngLiteral[]>([]);
  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = {
    lat: geocodedLocations.length > 0 ? geocodedLocations.reduce((sum, loc) => sum + loc.lat, 0) / geocodedLocations.length : 0,
    lng: geocodedLocations.length > 0 ? geocodedLocations.reduce((sum, loc) => sum + loc.lng, 0) / geocodedLocations.length : 0,
  };

  const geocodeAddress = async (address: string) => {
    const geocoder = new google.maps.Geocoder();
    return new Promise<google.maps.LatLngLiteral>((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const { geometry } = results[0];
          resolve({ lat: geometry.location.lat(), lng: geometry.location.lng() });
        } else {
          console.error(`Geocode failed for ${address}: ${status}`);
          reject(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  };

  useEffect(() => {
    const fetchGeocodedLocations = async () => {
      const locationsPromises = locations.map(async (location) => {
        const fullAddress = `${location.streetNumber} ${location.street}, ${location.postcode} ${location.city}, ${location.state}`;
        console.log("Fetching address:", fullAddress);
        try {
          return await geocodeAddress(fullAddress);
        } catch (error) {
          console.error(error);
          return null;
        }
      });

      const results = await Promise.all(locationsPromises);
      console.log("Geocoded results:", results);
      setGeocodedLocations(results.filter((result): result is google.maps.LatLngLiteral => result !== null));
    };

    fetchGeocodedLocations();
  }, [locations]);

  let subtitle: { style: { color: string; }; };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className="w-3/5 h-3/5 aspect-[3/5] m-16 rounded-lg">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
        libraries={['places']} // Required for geocoding if we're using places
      >
        <GoogleMap mapContainerStyle={mapStyles} zoom={5} center={defaultCenter}>
          {geocodedLocations.map((location, index) => (
            <div key={index}>
              <Marker
                position={location}
                title={locations[index].title}
                // onClick={() => console.log("Marker clicked:", locations[index].title)}
                onClick={openModal}
              />
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{locations[index].title}</h2>
                {/* <button onClick={closeModal}>close</button> */}
                <div>Best Place! 10 times would recommen</div>
                <form>
                  <input />
                  <button>tab navigation</button>
                  <button>stays</button>
                  <button>inside</button>
                  <button>the modal</button>
                </form>
              </Modal>
            </div>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
