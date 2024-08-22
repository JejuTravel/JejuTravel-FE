const AccommoRecommend = () => {
    const recommendedAccommodations = [
      {
        name: "Jeju Shilla Hotel",
        image: "../../../assets/jeju.jpg",
      },
      {
        name: "Lotte Hotel Jeju",
        image: "../../../assets/land.jpg",
      },
      {
        name: "Hyatt Regency Jeju",
        image: "../../../assets/jeju.jpg",
      },
    ];
  
    return (
      <div>
        <h2 className="text-[#00A08B] text-lg font-bold mb-4">숙박 추천</h2>
        <div className="flex space-x-4">
          {recommendedAccommodations.map((accommodation, index) => (
            <div key={index} className="bg-white p-2 rounded-lg shadow-lg">
              <img src={accommodation.image} alt={accommodation.name} className="h-40 w-40 object-cover rounded-lg" />
              <h3 className="text-center text-lg mt-2">{accommodation.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default AccommoRecommend;