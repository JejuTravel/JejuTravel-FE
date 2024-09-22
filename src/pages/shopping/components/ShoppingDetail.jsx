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

function ShoppingDetail() {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

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
        setError("无法加载详细信息。");
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingDetail();
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName") || "";

    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.warn("在 localStorage 中未找到用户ID");
    }

    setUserName(storedUserName);

    console.log("已存储的 userId:", storedUserId);
    console.log("已存储的 userName:", storedUserName);
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
          <p className="text-gray-600 text-lg">正在加载购物详情...</p>
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
            返回列表
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
            返回列表
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
              概述
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {itemDetails.overview || "无详细信息可用。"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              icon={MapPin}
              title="位置"
              content={itemDetails.address}
              defaultContent="无可用地址"
            />
            <InfoCard
              icon={Phone}
              title="联系方式"
              content={itemDetails.tel}
              defaultContent="无可用电话号码"
            />
            <InfoCard
              icon={Globe}
              title="网站"
              content={itemDetails.homepage}
              defaultContent="无可用网站"
              isLink
            />
            <InfoCard
              icon={Clock}
              title="营业时间"
              content={itemDetails.opentime}
              defaultContent="无可用营业时间"
            />
            <InfoCard
              icon={Calendar}
              title="休息日"
              content={itemDetails.restdateshopping}
              defaultContent="无可用休息日信息"
            />
            <InfoCard
              icon={Car}
              title="停车场"
              content={itemDetails.parkingshopping}
              defaultContent="无可用停车场信息"
            />
            <InfoCard
              icon={DollarSign}
              title="出售商品"
              content={itemDetails.saleitem}
              defaultContent="无可用商品信息"
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
