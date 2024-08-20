import React from "react";
import { Phone, MapPin } from "react-feather"; 
import restaurantImage1 from '../../../assets/jeju.jpg'; 
import restaurantImage2 from '../../../assets/land.jpg'; 
import restaurantImage3 from '../../../assets/jeju.jpg'; 
import restaurantImage4 from '../../../assets/land.jpg'; 
import restaurantImage5 from '../../../assets/jeju.jpg'; 
import restaurantImage6 from '../../../assets/land.jpg'; 

const RestaurantSection = ({ searchQuery, onItemClick }) => {
  const items = [
    { name: "ABC restaurant jeju", tel: "000-0000-0000", location: "JEJU", image: restaurantImage1 },
    { name: "Store 2", tel: "111-1111-1111", location: "Seoul", image: restaurantImage2 },
    { name: "Store 3", tel: "222-2222-2222", location: "Busan", image: restaurantImage3 },
    { name: "Store 4", tel: "333-3333-3333", location: "Incheon", image: restaurantImage4 },
    { name: "Store 5", tel: "444-4444-4444", location: "Jeju", image: restaurantImage5 },
    { name: "Store 6", tel: "555-5555-5555", location: "Daejeon", image: restaurantImage6 },
  ];

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-5">
      {filteredItems.map((item, index) => (
        <div 
          key={index} 
          className="bg-gray-50 p-6 rounded-lg shadow-lg flex h-64 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => onItemClick(item)} // 클릭 시 onItemClick 호출
        >
          <img src={item.image} alt={item.name || `Image ${index + 1}`} className="h-full w-96 object-cover rounded-lg mr-4" />
          <div className="flex flex-col justify-center">
            {item.name && <h3 className="text-2xl font-bold">{item.name}</h3>}
            {item.tel && (
              <p className="text-xl flex items-center">
                <Phone className="mr-2" /> {item.tel}
              </p>
            )}
            {item.location && (
              <p className="text-xl flex items-center">
                <MapPin className="mr-2" /> {item.location}
              </p>
            )}
          </div>
        </div>
      ))}
      {filteredItems.length === 0 && (
        <p className="text-center text-gray-500">No stores found matching your search.</p>
      )}
    </div>
  );
};

export default RestaurantSection;
