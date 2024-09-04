import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShoppingDetail } from "../../../apis";
import {
  MapPin,
  Phone,
  Globe,
  ShoppingBag,
  Clock,
  ArrowLeft,
  Loader,
  DollarSign,
  Calendar,
  Car,
} from "lucide-react";
import Header from "../../../components/Header";

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

function ShoppingDetail() {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShoppingDetail = async () => {
      try {
        const response = await getShoppingDetail(contentId);
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
        setItemDetails(data);
      } catch (err) {
        setError("Failed to load detailed information.");
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingDetail();
  }, [contentId]);

  const handleBackClick = () => {
    navigate("/shopping");
  };

  const defaultImage = "/api/placeholder/800/400";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-red-50 to-white">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#FF4C4C] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading shopping details...</p>
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

  if (!itemDetails) return null;

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
          <h2 className="text-3xl font-bold text-[#FF4C4C] mb-6">
            {itemDetails.title}
          </h2>
          <div className="relative h-64 md:h-96 mb-8 overflow-hidden rounded-xl shadow-lg">
            <img
              src={itemDetails.firstImage || defaultImage}
              alt={itemDetails.title}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={(e) => {
                e.target.src = defaultImage;
                e.target.classList.add("opacity-70");
              }}
            />
            {(!itemDetails.firstImage || itemDetails.firstImage === "") && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <ShoppingBag className="text-gray-400 w-16 h-16" />
              </div>
            )}
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#FF4C4C] mb-2">
              Overview
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {itemDetails.overview || "No detailed information available."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              icon={MapPin}
              title="Location"
              content={itemDetails.address}
              defaultContent="Address not available"
            />
            <InfoCard
              icon={Phone}
              title="Contact"
              content={itemDetails.tel}
              defaultContent="Phone number not available"
            />
            <InfoCard
              icon={Globe}
              title="Website"
              content={itemDetails.homepage}
              defaultContent="Website not available"
              isLink
            />
            <InfoCard
              icon={Clock}
              title="Opening Hours"
              content={itemDetails.opentime}
              defaultContent="Opening hours not available"
            />
            <InfoCard
              icon={Calendar}
              title="Closed Days"
              content={itemDetails.restdateshopping}
              defaultContent="Closed days information not available"
            />
            <InfoCard
              icon={Car}
              title="Parking"
              content={itemDetails.parkingshopping}
              defaultContent="Parking information not available"
            />
            <InfoCard
              icon={DollarSign}
              title="Sale Items"
              content={itemDetails.saleitem}
              defaultContent="Sale items information not available"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoCard = ({
  icon: Icon,
  title,
  content,
  defaultContent,
  isLink = false,
}) => {
  const displayContent = content || defaultContent;

  return (
    <div className="bg-red-50 p-4 rounded-lg shadow">
      <div className="flex items-center mb-2">
        <Icon className="text-[#FF4C4C] mr-2" />
        <h4 className="text-lg font-semibold text-[#FF4C4C]">{title}</h4>
      </div>
      {isLink && content ? (
        <a
          href={content}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF4C4C] hover:text-[#FF6B6B] hover:underline break-words"
        >
          {content}
        </a>
      ) : (
        <p className="text-gray-700 break-words">{displayContent}</p>
      )}
    </div>
  );
};

export default ShoppingDetail;
