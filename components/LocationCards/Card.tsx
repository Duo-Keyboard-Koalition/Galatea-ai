import Image from 'next/image';
import React from 'react';

interface CardProps {
  imageUrl: string;
  title: string;
  rating: number;
  info: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, rating, info }) => {
  return (
    <div className="flex border rounded-lg shadow-md mb-4 overflow-hidden">
      <div className="w-1/3">
        <Image src={imageUrl} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col justify-center p-4 w-2/3">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600">Rating: {rating}</p>
        <p className="text-gray-500">{info}</p>
      </div>
    </div>
  );
};

export default Card;
