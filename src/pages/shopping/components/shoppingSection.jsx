import React from "react";
import { Phone, MapPin } from "react-feather"; 
import shoppingImage1 from '../../../assets/jeju.jpg'; 
import shoppingImage2 from '../../../assets/land.jpg'; 
import shoppingImage3 from '../../../assets/jeju.jpg'; 
import shoppingImage4 from '../../../assets/land.jpg'; 
import shoppingImage5 from '../../../assets/jeju.jpg'; 
import shoppingImage6 from '../../../assets/land.jpg'; 

function ShoppingSection({ onItemClick }) { // onItemClick 함수 prop 추가
  const items = [
    { name: "ABC MART jeju", tel: "000-0000-0000", location: "JEJU", image: shoppingImage1 },
    { name: "", tel: "", location: "", image: shoppingImage2 },
    { name: "", tel: "", location: "", image: shoppingImage3 },
    { name: "", tel: "", location: "", image: shoppingImage4 },
    { name: "", tel: "", location: "", image: shoppingImage5 },
    { name: "", tel: "", location: "", image: shoppingImage6 },
  ];

  return (
    <div className="flex flex-col space-y-5">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="bg-gray-50 p-6 rounded-lg shadow-lg flex h-64 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => onItemClick(item)} // 클릭 이벤트 추가
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
    </div>
  );
}

export default ShoppingSection;
