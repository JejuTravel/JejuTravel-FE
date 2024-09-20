import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAccommodationDetail } from "../../../apis";
import Header from "../../../components/Header";
import ReviewComponent from "../../../components/ReviewComponent";
import {
  Loader,
  Phone,
  Clock,
  Car,
  Home,
  Coffee,
  Bed,
  ArrowLeft,
  Globe,
  Users,
  Utensils,
  Info,
  MapPin,
} from "lucide-react";

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

const extractUrl = (str) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const match = str.match(urlRegex);
  return match ? match[0] : null;
};

function AccommodationDetail() {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchAccommodationDetail = async () => {
      try {
        const response = await getAccommodationDetail(contentId);
        const data = response.data.data[0];
        Object.keys(data).forEach((key) => {
          if (typeof data[key] === "string") {
            data[key] = removeHtmlTags(convertBrToNewline(data[key]));
          }
        });
        setAccommodation(data);
      } catch (err) {
        console.error("Error fetching accommodation detail:", err);
        setError("Failed to load accommodation information.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodationDetail();
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID not found in localStorage");
    }
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      console.error("User Name not found in localStorage");
    }
  }, [contentId]);

  const handleBackClick = () => {
    navigate("/accommodation");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-xl bg-white p-6 rounded-lg shadow-lg">
          {error}
        </p>
      </div>
    );
  }

  if (!accommodation) return null;

  const showBenikia =
    accommodation.benikia &&
    accommodation.benikia !== "0" &&
    accommodation.benikia !== "null";
  const showGoodstay =
    accommodation.goodstay &&
    accommodation.goodstay !== "0" &&
    accommodation.goodstay !== "null";
  const showHanok =
    accommodation.hanok &&
    accommodation.hanok !== "0" &&
    accommodation.hanok !== "null";

  const homepageUrl = extractUrl(accommodation.homepage);
  const reservationUrl = extractUrl(accommodation.reservationurl);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <button
            onClick={handleBackClick}
            className="m-6 text-blue-500 hover:text-blue-700 flex items-center transition duration-300"
          >
            <ArrowLeft className="mr-2" />
            Back to List
          </button>
          <div className="relative h-96">
            {accommodation.firstImage ? (
              <img
                src={accommodation.firstImage}
                alt={accommodation.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <Bed className="text-gray-400 w-32 h-32" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h1 className="text-4xl font-bold text-white mb-2">
                {accommodation.title}
              </h1>
              <p className="text-gray-200">{accommodation.address}</p>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoSection
                title="Basic Information"
                icon={<Home className="text-blue-500" />}
              >
                <InfoItem
                  icon={<Phone />}
                  text={accommodation.tel || "Not available"}
                />
                <InfoItem
                  icon={<Clock />}
                  text={`Check-in: ${
                    accommodation.checkintime || "Not available"
                  }`}
                />
                <InfoItem
                  icon={<Clock />}
                  text={`Check-out: ${
                    accommodation.checkouttime || "Not available"
                  }`}
                />
                <InfoItem
                  icon={<Home />}
                  text={`Scale: ${
                    accommodation.scalelodging || "Not available"
                  }`}
                />
                <InfoItem
                  icon={<Users />}
                  text={`Capacity: ${
                    accommodation.accomcountlodging || "Not available"
                  }`}
                />
                {homepageUrl && (
                  <InfoItem
                    icon={<Globe />}
                    text={
                      <a
                        href={homepageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Visit Website
                      </a>
                    }
                  />
                )}
              </InfoSection>
              <InfoSection
                title="Facilities & Services"
                icon={<Coffee className="text-green-500" />}
              >
                <InfoItem
                  icon={<Car />}
                  text={`Parking: ${
                    accommodation.parkinglodging || "Not available"
                  }`}
                />
                <InfoItem
                  icon={<Coffee />}
                  text={`Facilities: ${
                    accommodation.subfacility || "Not available"
                  }`}
                />
                <InfoItem
                  icon={<Bed />}
                  text={`Room count: ${
                    accommodation.roomcount || "Not available"
                  }`}
                />
                <InfoItem
                  icon={<Bed />}
                  text={`Room types: ${
                    accommodation.roomtype || "Not available"
                  }`}
                />
                <InfoItem
                  icon={<Utensils />}
                  text={`Food Place: ${
                    accommodation.foodplace || "Not available"
                  }`}
                />
                <InfoItem
                  icon={<Info />}
                  text={`Info center: ${
                    accommodation.infocenterlodging || "Not available"
                  }`}
                />
              </InfoSection>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">
                About the Accommodation
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {accommodation.overview || "No information available."}
              </p>
            </div>
            {accommodation.directions && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="text-blue-500" />
                  How to Get There
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {accommodation.directions}
                </p>
              </div>
            )}
            {reservationUrl && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">
                  Reservation Information
                </h2>
                <p className="mb-2">
                  <strong>Reservation phone:</strong>{" "}
                  {accommodation.reservationlodging || "Not available"}
                </p>
                <a
                  href={reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Visit Reservation Website
                </a>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {showBenikia && <Tag text="Benikia" color="blue" />}
              {showGoodstay && <Tag text="Goodstay" color="green" />}
              {showHanok && <Tag text="Hanok" color="red" />}
            </div>
          </div>
          <div className="mt-8 p-6">
            <ReviewComponent
              contentId={contentId}
              contentTypeId={accommodation.contentTypeId}
              cat3={accommodation.cat3}
              userId={userId}
              userName={userName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoSection({ title, icon, children }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function InfoItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-gray-700">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function Tag({ text, color }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]}`}
    >
      {text}
    </span>
  );
}

export default AccommodationDetail;
