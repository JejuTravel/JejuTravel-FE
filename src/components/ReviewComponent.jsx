import React, { useState, useEffect, useCallback } from "react";
import {
  getReviews,
  saveReview,
  updateReview,
  deleteReview,
  getReviewAverage,
} from "../apis";
import { Star, Loader2, Edit2, Trash2, MessageSquare } from "lucide-react";

const ReviewComponent = ({
  contentId,
  contentTypeId,
  cat3,
  userId,
  userName,
}) => {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [newReview, setNewReview] = useState({
    reviewContent: "",
    reviewRating: 0,
  });
  const [editingReview, setEditingReview] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getReviews(contentId);
      setReviews(response.data.data.content || []);
    } catch (error) {
      console.error("评论获取出错:", error);
      setError(
        "抱歉！我们现在无法加载评论。再试一次吧！"
      );
    } finally {
      setIsLoading(false);
    }
  }, [contentId]);

  const fetchReviewAverage = useCallback(async () => {
    try {
      const response = await getReviewAverage(contentId);
      setAverage(response.data.data);
    } catch (error) {
      console.error("获取评论平均分出错:", error);
    }
  }, [contentId]);

  useEffect(() => {
    fetchReviews();
    fetchReviewAverage();
  }, [fetchReviews, fetchReviewAverage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!userId) {
      setError("抱歉！您需要登录才能分享您的想法。");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await saveReview({
        userId: parseInt(userId),
        contentId,
        contentTypeId,
        cat3,
        reviewContent: newReview.reviewContent,
        reviewRating: newReview.reviewRating,
      });
      if (response.data.status === "success") {
        setNewReview({ reviewContent: "", reviewRating: 0 });
        fetchReviews();
        fetchReviewAverage();
      } else {
        setError("嗯，出现了一些问题。再试一次吧！");
      }
    } catch (error) {
      console.error("提交评论时出错:", error);
      setError("抱歉！遇到了问题。再试一次提交您的评论吧！");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setNewReview({
      reviewContent: review.reviewContent,
      reviewRating: review.reviewRating,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await updateReview({
        reviewId: editingReview.reviewId,
        reviewContent: newReview.reviewContent,
        reviewRating: newReview.reviewRating,
      });
      if (response.data.status === "success") {
        setEditingReview(null);
        setNewReview({ reviewContent: "", reviewRating: 0 });
        fetchReviews();
        fetchReviewAverage();
      } else {
        setError(
          "嗯，更新没有成功。再试一次吧！"
        );
      }
    } catch (error) {
      console.error("更新评论时出错:", error);
      setError("抱歉！无法更新您的评论。再试一次吧！");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (
      window.confirm(
        "确定要删除这条评论吗？它将永久删除！"
      )
    ) {
      try {
        const response = await deleteReview(reviewId);
        if (response.data.status === "success") {
          fetchReviews();
          fetchReviewAverage();
        } else {
          setError("我们无法删除该评论。要再试一次吗？");
        }
      } catch (error) {
        console.error("删除评论时出错:", error);
        setError(
          "抱歉！删除时出了点问题。再试一次吧！"
        );
      }
    }
  };

  const renderStars = (rating, isInteractive = false) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-6 h-6 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        } ${
          isInteractive
            ? "cursor-pointer transition-colors duration-200 hover:text-yellow-500"
            : ""
        }`}
        onClick={() =>
          isInteractive &&
          setNewReview({ ...newReview, reviewRating: index + 1 })
        }
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-white rounded-xl shadow-lg p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">评论</h2>
        <div className="flex justify-center items-center mb-4">
          <div className="flex mr-2">{renderStars(average)}</div>
          <span className="text-2xl font-semibold text-yellow-500">
            {average ? average.toFixed(1) : "暂无评分"}
          </span>
        </div>
        <p className="text-gray-600">
          {reviews.length > 0
            ? `基于 ${reviews.length} 条评论`
            : "成为第一个分享您体验的人吧！"}
        </p>
      </div>

      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      {userId ? (
        <form
          onSubmit={editingReview ? handleUpdate : handleSubmit}
          className="space-y-4 bg-gray-50 p-6 rounded-lg"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {editingReview ? "编辑您的评论" : "分享您的体验"}
          </h3>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            value={newReview.reviewContent}
            onChange={(e) =>
              setNewReview({ ...newReview, reviewContent: e.target.value })
            }
            placeholder="分享您的体验..."
            rows="4"
            required
          />
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-medium">您的评分:</span>
            {renderStars(newReview.reviewRating, true)}
          </div>
          <button
            className={`w-full bg-[#FF4C4C] text-white py-2 px-4 rounded-md hover:bg-[#FF6B6B] transition duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={
              !newReview.reviewContent ||
              newReview.reviewRating === 0 ||
              isSubmitting
            }
          >
            {isSubmitting
              ? "提交中..."
              : editingReview
              ? "更新评论"
              : "提交评论"}
          </button>

          {editingReview && (
            <button
              className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
              onClick={() => {
                setEditingReview(null);
                setNewReview({ reviewContent: "", reviewRating: 0 });
              }}
            >
              取消编辑
            </button>
          )}
        </form>
      ) : (
        <div
          className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md"
          role="alert"
        >
          <p className="font-bold">嗨！</p>
          <p>想分享您的想法？登录后即可发表评论！</p>
        </div>
      )}

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.reviewId}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                      {review.userName || "匿名用户"}
                    </h4>
                    <div className="flex items-center">
                      {renderStars(review.reviewRating || 0)}
                      <span className="ml-2 text-sm text-gray-600">
                        {review.reviewUpdatedAt
                          ? new Date(
                              review.reviewUpdatedAt
                            ).toLocaleDateString()
                          : "未知日期"}
                      </span>
                    </div>
                  </div>
                  {userId && review.userName === userName && (
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                        onClick={() => handleEdit(review)}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors duration-300"
                        onClick={() => handleDelete(review.reviewId)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 whitespace-pre-line">
                  {review.reviewContent || "无内容"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-xl font-semibold text-gray-700 mb-2">
              还没有评论
            </p>
            <p className="text-gray-600">
              成为第一个分享您体验的人吧！
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
