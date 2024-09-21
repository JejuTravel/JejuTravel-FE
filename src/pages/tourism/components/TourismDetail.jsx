import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTourismDetail } from "../../../apis";
import {
  MapPin,
  Phone,
  Globe,
  Car,
  Clock,
  ArrowLeft,
  Loader,
  Image,
} from "lucide-react";
import Header from "../../../components/Header";
import ReviewComponent from "../../../components/ReviewComponent";

const removeHtmlTags = (str) => {
  if (str === null || str === "") return "";
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/g, " ");
};

const convertBrToNewline = (str) => {
  if (str === null || str === "") return "";
  else str = str.toString();
  return str.replace(/<br\s*\/?>/gi, "\n");
};

function TourismDetail() {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await getTourismDetail(contentId);
        const data = response.data.data[0];
        Object.keys(data).forEach((key) => {
          if (typeof data[key] === "string") {
            if (key === "homepage") {
              const homepageMatch = data[key].match(/href="([^"]*)"/);
              data[key] = homepageMatch ? homepageMatch[1] : "";
            } else {
              data[key] = removeHtmlTags(convertBrToNewline(data[key]));
            }
          }
        });
        setEvent(data);
      } catch (err) {
        setError("Failed to load detailed information.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName") || "";

    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.warn("User ID not found in localStorage");
    }

    setUserName(storedUserName);

    console.log("Stored userId:", storedUserId);
    console.log("Stored userName:", storedUserName);
  }, [contentId]);

  const handleBackClick = () => {
    navigate("/tourism");
  };

  const defaultImage = "/api/placeholder/800/400";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-red-50 to-white">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#FF4C4C] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-red-50 to-white">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={handleBackClick}
            className="px-4 py-2 bg-[#FF4C4C] text-white rounded hover:bg-[#FF6B6B] transition duration-300"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto animate-fade-in">
          <button
            onClick={handleBackClick}
            className="mb-6 text-[#FF4C4C] hover:text-[#FF6B6B] flex items-center transition duration-300"
          >
            <ArrowLeft className="mr-2" />
            Back to List
          </button>
          <h2 className="text-4xl font-bold mb-6 text-[#FF4C4C] border-b-2 border-[#FF8585] pb-4">
            {event.title}
          </h2>
          <div className="relative h-80 md:h-96 mb-8 overflow-hidden rounded-xl shadow-lg">
            <img
              src={event.firstImage || defaultImage}
              alt={event.title}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={(e) => {
                e.target.src = defaultImage;
                e.target.classList.add("opacity-70");
              }}
            />
            {(!event.firstImage || event.firstImage === "") && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <span className="text-gray-500 text-2xl">
                  No Image Available
                </span>
              </div>
            )}
          </div>
          <p className="text-gray-700 mb-8 leading-relaxed whitespace-pre-line">
            {event.overview || "No detailed information available."}
          </p>

          <div className="space-y-4 bg-red-50 p-6 rounded-xl">
            <InfoItem
              icon={MapPin}
              label="address"
              text={event.address}
              defaultText="No address information available"
            />
            <InfoItem
              icon={Phone}
              label="tel"
              text={event.tel}
              defaultText="No phone number available"
            />
            <InfoItem
              icon={Globe}
              label="homepage"
              text={event.homepage}
              defaultText="No website information available"
              isLink
            />
            <InfoItem
              icon={Car}
              label="parking"
              text={event.parking}
              defaultText="No parking information available"
            />
            <InfoItem
              icon={Clock}
              label="usetime"
              text={event.usetime}
              defaultText="No operating hours available"
            />
            <InfoItem
              icon={Image}
              label="restdate"
              text={event.restdate}
              defaultText="No rest date information available"
            />
            {event.infocenter && (
              <InfoItem
                icon={Phone}
                label="infocenter"
                text={event.infocenter}
                defaultText="No information center details available"
              />
            )}
          </div>
          <div className="mt-8">
            <ReviewComponent
              contentId={contentId}
              contentTypeId={event.contentTypeId}
              cat3={event.cat3}
              userId={userId}
              userName={userName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ icon: Icon, label, text, defaultText, isLink = false }) => {
  const displayText = text || defaultText;

  return (
    <div className="flex items-start p-2 hover:bg-red-100 rounded-lg transition duration-300">
      <Icon className="text-[#FF4C4C] mr-3 text-xl flex-shrink-0 mt-1" />
      <div className="flex-grow">
        <span className="font-semibold text-gray-800 capitalize">
          {label}:{" "}
        </span>
        {isLink && text ? (
          <a
            href={text}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF4C4C] hover:text-[#FF6B6B] hover:underline break-words"
          >
            {text}
          </a>
        ) : (
          <span className="text-gray-700 break-words whitespace-pre-line">
            {displayText}
          </span>
        )}
      </div>
    </div>
  );
};

export default TourismDetail;
