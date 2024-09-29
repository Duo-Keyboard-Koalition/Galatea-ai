import NavBar from "@/components/NavBar/NavBar";
import LocationCards from "@/components/LocationCards/LocationCards";
import Map from "@/components/Map/Map"

const locations = [
  {
    streetNumber: "4700",
    street: "Keele St",
    postcode: "M3J 1P3",
    city: "",
    state: "",
    title: "York University",
    image: "https://www.yorku.ca/wp-content/uploads/2021/06/vari-drone-1024x682.jpg"
  },
  {
    streetNumber: "75",
    street: "Laurier Ave E",
    postcode: "",
    city: "Ottawa",
    state: "",
    title: "uOttawa",
  },
];

export default function Home() {
  return (
    <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
      <NavBar/>
      <div className='flex flex-row'>
        <div className='w-2/5'>
        <LocationCards locations={locations} />
        </div>
        <div className='w-3/5'>
          <Map locations={locations}/>
        </div>
      </div>
    </div>
  );
}
