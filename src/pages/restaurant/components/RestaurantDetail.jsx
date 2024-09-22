import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRestaurantDetail } from "../../../apis";
import {
  MapPin,
  Phone,
  Globe,
  Utensils,
  Clock,
  ArrowLeft,
  Loader,
  Calendar,
  Car,
  DollarSign,
  BookOpen,
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

function RestaurantDetail() {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        const response = await getRestaurantDetail(contentId);
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
        setError("加载详细信息失败。");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetail();

    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName") || "";

    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.warn("localStorage中未找到用户ID。");
    }

    setUserName(storedUserName);

    console.log("Stored userId:", storedUserId);
    console.log("Stored userName:", storedUserName);
  }, [contentId]);

  const handleBackClick = () => {
    navigate("/restaurant");
  };

  const defaultImage = "/api/placeholder/800/400";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#FF6B35] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">加载餐厅详细信息...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={handleBackClick}
            className="px-4 py-2 bg-[#FF6B35] text-white rounded hover:bg-[#FF8C61] transition duration-300"
          >
            返回列表
          </button>
        </div>
      </div>
    );
  }

  if (!itemDetails) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto animate-fade-in">
          <button
            onClick={handleBackClick}
            className="mb-6 text-[#FF6B35] hover:text-[#FF8C61] flex items-center transition duration-300"
          >
            <ArrowLeft className="mr-2" />
            返回列表
          </button>
          <h2 className="text-3xl font-bold text-[#FF6B35] mb-6">
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
                <Utensils className="text-gray-400 w-16 h-16" />
              </div>
            )}
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#FF6B35] mb-2">
              餐厅概述
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {itemDetails.overview || "暂无详细信息。"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              icon={MapPin}
              title="地址"
              content={itemDetails.address}
              defaultContent="无地址信息"
            />
            <InfoCard
              icon={Phone}
              title="联系方式"
              content={[
                { label: "电话", value: itemDetails.tel },
                { label: "信息中心", value: itemDetails.infocenterfood },
              ]}
              defaultContent="无联系信息"
            />
            <InfoCard
              icon={Globe}
              title="网站"
              content={itemDetails.homepage}
              defaultContent="无网站信息"
              isLink
            />
            <InfoCard
              icon={Clock}
              title="营业时间"
              content={itemDetails.opentimefood}
              defaultContent="无营业时间信息"
            />
            <InfoCard
              icon={Calendar}
              title="休息日"
              content={itemDetails.restdatefood}
              defaultContent="无休息日信息"
            />
            <InfoCard
              icon={Car}
              title="停车"
              content={itemDetails.parkingfood}
              defaultContent="无停车信息"
            />
            <InfoCard
              icon={DollarSign}
              title="主菜单"
              content={itemDetails.firstmenu}
              defaultContent="无菜单信息"
            />
            <InfoCard
              icon={Utensils}
              title="附加菜单"
              content={itemDetails.treatmenu}
              defaultContent="无附加菜单信息"
            />
            <InfoCard
              icon={BookOpen}
              title="预订"
              content={itemDetails.reservationfood}
              defaultContent="无预订信息"
            />
          </div>
          <div className="mt-8">
            <ReviewComponent
              contentId={contentId}
              contentTypeId={itemDetails.contentTypeId}
              cat3={itemDetails.cat3}
              userId={userId}
              userName={userName}
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
  const hasContent = Array.isArray(content)
    ? content.some((item) => item.value)
    : content;

  if (!hasContent) return null;

  return (
    <div className="bg-orange-50 p-4 rounded-lg shadow">
      <div className="flex items-center mb-2">
        <Icon className="text-[#FF6B35] mr-2" />
        <h4 className="text-lg font-semibold text-[#FF6B35]">{title}</h4>
      </div>
      {isLink && content ? (
        <a
          href={content}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF6B35] hover:text-[#FF8C61] hover:underline break-words"
        >
          {content}
        </a>
      ) : Array.isArray(content) ? (
        content.map((item, index) =>
          item.value ? (
            <p key={index} className="text-gray-700 break-words">
              <span className="font-semibold">{item.label}:</span> {item.value}
            </p>
          ) : null
        )
      ) : (
        <p className="text-gray-700 break-words">{content || defaultContent}</p>
      )}
    </div>
  );
};

export default RestaurantDetail;
