import React from 'react';

const AccommoReview = () => {
  const reviews = [
    {
      user: "hj02***",
      review: "수영장이 있어서 재밌게 놀았습니다! 공항에서도 가까워서 좋습니다~",
      rating: 4.5
    },
    {
      user: "kim01***",
      review: "객실이 넓고 깨끗해서 좋았어요. 서비스도 훌륭했습니다.",
      rating: 4.7
    },
    {
      user: "lee99***",
      review: "주변 환경이 조용하고 좋습니다. 다음에 또 오고 싶어요.",
      rating: 4.8
    }
  ];

  return (
    <div>
      <h2 className="text-[#00A08B] text-lg font-bold mb-4">Accommodation Review</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {reviews.map((review, index) => (
          <div 
            key={index} 
            className="mb-4 p-4 bg-gray-100 rounded-lg"
          >
            <p className="text-sm text-gray-700"><strong>{review.user}</strong></p>
            <p className="text-md text-gray-900">{review.review}</p>
            <p className="text-sm text-yellow-500">RATE: {review.rating}</p>
          </div>
        ))}
        <div className="text-right">
          <a href="#" className="text-red-500">view more</a>
        </div>
      </div>
    </div>
  );
};

export default AccommoReview;
