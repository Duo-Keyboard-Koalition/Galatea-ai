// app/map/page.tsx
import React from 'react';

const MapPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl mb-4">Reel It Back Location Map</h1>
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1F7toBFiw5CEN1UDlpbFrKgTunRVHM1Q"
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowFullScreen
      />
    </div>
  );
};

export default MapPage;
