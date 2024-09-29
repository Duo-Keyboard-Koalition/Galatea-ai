import Card from './Card';

interface Location {
  streetNumber: string;
  street: string;
  postcode: string;
  city: string;
  state: string;
  title: string;
  rating: number;
  imageUrl: string;
}

interface LocationCardsProps {
  locations: Location[];
}

const LocationCards: React.FC<LocationCardsProps> = ({ locations }) => {
  return (
    <div className='m-16'>
      {locations.map((location, index) => (
        <Card
          key={index}
          imageUrl={location.imageUrl}
          title={location.title}
          rating={location.rating}
          info={`${location.streetNumber} ${location.street}, ${location.postcode} ${location.city}, ${location.state}`}
        />
      ))}
    </div>
  );
}

export default LocationCards;
