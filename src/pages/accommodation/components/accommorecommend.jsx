const AccommoRecommend = () => {
    const recommendedAccommodations = [
        {
          name: "Jeju Shilla Hotel",
          image: "../../assets/jeju.jpg", // 상대 경로로 수정
        },
        {
          name: "Lotte Hotel Jeju",
          image: "../../assets/land.jpg", // 상대 경로로 수정
        },
        {
          name: "Hyatt Regency Jeju",
          image: "../../assets/jeju.jpg", // 상대 경로로 수정
        },
      ];
    
  
    return (
      <div>
        <h2 className="text-[#FF4C4C] text-2xl font-bold mb-4">Recommended Accommodations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedAccommodations.map((accommodation, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <img src={accommodation.image} alt={accommodation.name} className="h-40 w-full object-cover rounded-lg" />
              <h3 className="text-center text-lg mt-2">{accommodation.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default AccommoRecommend;
  