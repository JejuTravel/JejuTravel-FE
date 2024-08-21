import React, { useEffect, useRef, useState } from "react";

function BusMap({ busStops, hoveredStop, selectedStop }) {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const overlaysRef = useRef({});
  const [map, setMap] = useState(null);

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
          center: new window.kakao.maps.LatLng(33.499621, 126.531254),
          level: 10,
        };
        const mapInstance = new window.kakao.maps.Map(container, options);
        mapRef.current = mapInstance;
        setMap(mapInstance);

        updateBusStopMarkers(mapInstance);
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
    };
  }, []);

  useEffect(() => {
    if (map) {
      updateBusStopMarkers(map);
    }
  }, [busStops]);

  useEffect(() => {
    if (map && hoveredStop) {
      const marker = markersRef.current[hoveredStop.stationId];
      if (marker) {
        map.panTo(marker.getPosition());
      }
    }
  }, [hoveredStop]);

  useEffect(() => {
    if (map && selectedStop) {
      const marker = markersRef.current[selectedStop.stationId];
      const overlay = overlaysRef.current[selectedStop.stationId];
      if (marker && overlay) {
        map.panTo(marker.getPosition());
        overlay.setMap(map);
      }
    } else {
      Object.values(overlaysRef.current).forEach((overlay) =>
        overlay.setMap(null)
      );
    }
  }, [selectedStop]);

  const updateBusStopMarkers = (mapInstance) => {
    Object.values(markersRef.current).forEach((marker) => marker.setMap(null));
    Object.values(overlaysRef.current).forEach((overlay) =>
      overlay.setMap(null)
    );
    markersRef.current = {};
    overlaysRef.current = {};

    busStops.forEach((stop) => {
      const markerPosition = new window.kakao.maps.LatLng(
        stop.latitude,
        stop.longitude
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: mapInstance,
      });

      const content = `
        <div class="custom-overlay" style="
          position: absolute;
          bottom: 40px;
          left: -125px;
          width: 250px;
          padding: 15px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          z-index: 1;
        ">
          <div style="
            position: relative;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 2px solid #FF4C4C;
          ">
            <h3 style="
              margin: 0;
              color: #FF4C4C;
              font-size: 18px;
              font-weight: bold;
            ">${stop.stationName}</h3>
            <button onclick="closeOverlay('${stop.stationId}')" style="
              position: absolute;
              top: 0;
              right: 0;
              background: none;
              border: none;
              font-size: 20px;
              cursor: pointer;
              color: #FF4C4C;
            ">&times;</button>
          </div>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Address:</strong> ${stop.stationAddress}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Local Info:</strong> ${stop.localInfo}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Direction:</strong> ${stop.direction}</p>
        </div>
      `;

      const overlay = new window.kakao.maps.CustomOverlay({
        content: content,
        position: markerPosition,
        yAnchor: 1,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        Object.values(overlaysRef.current).forEach((o) => o.setMap(null));
        overlay.setMap(mapInstance);
      });

      markersRef.current[stop.stationId] = marker;
      overlaysRef.current[stop.stationId] = overlay;
    });
  };

  window.closeOverlay = (stationId) => {
    if (overlaysRef.current[stationId]) {
      overlaysRef.current[stationId].setMap(null);
    }
  };

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
}

export default BusMap;
