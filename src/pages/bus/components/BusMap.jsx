import React, { useEffect } from "react";

function BusMap() {
  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY
    }&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 9,
        };
        const map = new window.kakao.maps.Map(container, options);

        const busStops = [
          {
            position: new window.kakao.maps.LatLng(33.450701, 126.570667),
            title: "버스 정류장 1",
          },
        ];

        busStops.forEach((stop) => {
          new window.kakao.maps.Marker({
            map: map,
            position: stop.position,
            title: stop.title,
          });
        });
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, []);

  return (
    <div className="MapContainer w-full h-96">
      <div id="map" className="w-full h-full" />
    </div>
  );
}

export default BusMap;
