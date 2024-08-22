import React, { useEffect, useRef, useState } from "react";

function Map({
  items,
  hoveredItem,
  selectedItem,
  itemKey,
  latitudeKey,
  longitudeKey,
  nameKey,
  addressKey,
  extraInfoKey,
}) {
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

        updateMarkers(mapInstance);
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
    };
  }, []);

  useEffect(() => {
    if (map) {
      updateMarkers(map);
    }
  }, [items]);

  useEffect(() => {
    if (map && hoveredItem) {
      const marker = markersRef.current[hoveredItem[itemKey]];
      if (marker) {
        map.panTo(marker.getPosition());
      }
    }
  }, [hoveredItem]);

  useEffect(() => {
    if (map && selectedItem) {
      const marker = markersRef.current[selectedItem[itemKey]];
      const overlay = overlaysRef.current[selectedItem[itemKey]];
      if (marker && overlay) {
        map.panTo(marker.getPosition());
        overlay.setMap(map);
      }
    } else {
      Object.values(overlaysRef.current).forEach((overlay) =>
        overlay.setMap(null)
      );
    }
  }, [selectedItem]);

  const updateMarkers = (mapInstance) => {
    Object.values(markersRef.current).forEach((marker) => marker.setMap(null));
    Object.values(overlaysRef.current).forEach((overlay) =>
      overlay.setMap(null)
    );
    markersRef.current = {};
    overlaysRef.current = {};

    items.forEach((item) => {
      const markerPosition = new window.kakao.maps.LatLng(
        item[latitudeKey],
        item[longitudeKey]
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: mapInstance,
      });

      const content = `
        <div class="custom-overlay" style="
          position: absolute;
          bottom: 40px;
          left: -150px; 
          width: 350px; 
          padding: 20px; 
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          z-index: 1;
          word-wrap: break-word; 
        ">
          <div style="
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 2px solid #FF4C4C;
          ">
            <h3 style="
              margin: 0;
              color: #FF4C4C;
              font-size: 18px;
              font-weight: bold;
              word-break: break-word; 
            ">${item[nameKey]}</h3>
            <button onclick="closeOverlay('${item[itemKey]}')" style="
              position: absolute;
              top: 10px;
              right: 10px;
              background: none;
              border: none;
              font-size: 18px;
              cursor: pointer;
              color: #FF4C4C;
            ">&times;</button>
          </div>
          <p style="margin: 8px 0; font-size: 14px; word-break: break-word;">
            <strong>Address:</strong> ${item[addressKey]}
          </p>
          ${
            extraInfoKey
              ? `<p style="margin: 8px 0; font-size: 14px; word-break: break-word;">
                  <strong>Info:</strong> ${item[extraInfoKey]}
                </p>`
              : ""
          }
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

      markersRef.current[item[itemKey]] = marker;
      overlaysRef.current[item[itemKey]] = overlay;
    });
  };

  window.closeOverlay = (itemId) => {
    if (overlaysRef.current[itemId]) {
      overlaysRef.current[itemId].setMap(null);
    }
  };

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
}

export default Map;
