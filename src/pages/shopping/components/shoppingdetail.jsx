import React from 'react';
import { Phone, MapPin, Globe, Clock } from 'react-feather';

function ShoppingDetail({ item, onBackClick }) {
  // item에 따라 홈페이지와 운영시간 데이터를 설정합니다.
  const details = {
    "ABC MART jeju": {
      website: "https://www.abcmartjeju.com",
      hours: "09:00 - 22:00",
    },
    // 다른 아이템에 대한 세부 정보 추가 가능
  };

  const currentDetails = details[item.name] || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <button onClick={onBackClick} className="mb-4 text-blue-500 hover:text-blue-700">
        ← Back to list
      </button>
      <h2 className="text-4xl font-bold mb-4">{item.name}</h2>
      
      <div className="text-xl flex items-center mb-2">
        <Phone className="mr-2" /> <span>{item.tel}</span>
      </div>
      
      <div className="text-xl flex items-center mb-2">
        <MapPin className="mr-2" /> <span>{item.location}</span>
      </div>

      {currentDetails.website && (
        <div className="text-xl flex items-center mb-2">
          <Globe className="mr-2" /> 
          <a href={currentDetails.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            {currentDetails.website}
          </a>
        </div>
      )}
      
      {currentDetails.hours && (
        <div className="text-xl flex items-center mb-4">
          <Clock className="mr-2" /> <span>{currentDetails.hours}</span>
        </div>
      )}
      
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-auto rounded-lg shadow-md object-cover" 
        style={{ maxHeight: '400px' }} // 이미지 크기 조정
      />
    </div>
  );
}

export default ShoppingDetail;
