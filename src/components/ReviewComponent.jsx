import React, { useState, useEffect, useCallback } from "react";
import {
  getReviews,
  saveReview,
  updateReview,
  deleteReview,
  getReviewAverage,
} from "../apis";
import { StarIcon, Loader, Edit, Trash2 } from "lucide-react";

const ReviewComponent = ({ contentId, contentTypeId, cat3, userId }) => {
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
      setReviews(response.data.data.content);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to fetch reviews. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [contentId]);

  const fetchReviewAverage = useCallback(async () => {
    try {
      const response = await getReviewAverage(contentId);
      setAverage(response.data.data);
    } catch (error) {
      console.error("Error fetching review average:", error);
      setError("Failed to fetch average rating. Please try again later.");
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
      setError("Please log in to submit a review.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await saveReview({
        userId,
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
        setError(
          response.data.message || "Failed to submit review. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while submitting the review. Please try again."
      );
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
          response.data.message || "Failed to update review. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating review:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while updating the review. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await deleteReview(reviewId);
        if (response.data.status === "success") {
          fetchReviews();
          fetchReviewAverage();
        } else {
          setError(
            response.data.message ||
              "Failed to delete review. Please try again."
          );
        }
      } catch (error) {
        console.error("Error deleting review:", error);
        setError(
          error.response?.data?.message ||
            "An error occurred while deleting the review. Please try again."
        );
      }
    }
  };

  const renderStars = (rating, isInteractive = false) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`${index < rating ? "text-yellow-400" : "text-gray-300"} ${
          isInteractive ? "cursor-pointer" : ""
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
        <Loader className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">Reviews</h2>
          <p className="text-lg mb-4">
            Average Rating:{" "}
            <span className="font-semibold">
              {average ? average.toFixed(1) : "N/A"}
            </span>
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {userId ? (
            <form
              onSubmit={editingReview ? handleUpdate : handleSubmit}
              className="space-y-4"
            >
              <textarea
                className="textarea textarea-bordered w-full h-32"
                value={newReview.reviewContent}
                onChange={(e) =>
                  setNewReview({ ...newReview, reviewContent: e.target.value })
                }
                placeholder="Write your review..."
                required
              />
              <div className="flex items-center space-x-2">
                <span className="mr-2">Your Rating:</span>
                {renderStars(newReview.reviewRating, true)}
              </div>
              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={
                  !newReview.reviewContent ||
                  newReview.reviewRating === 0 ||
                  isSubmitting
                }
              >
                {isSubmitting ? (
                  <Loader className="animate-spin mr-2" size={20} />
                ) : null}
                {isSubmitting
                  ? "Submitting..."
                  : editingReview
                  ? "Update Review"
                  : "Submit Review"}
              </button>
              {editingReview && (
                <button
                  className="btn btn-secondary w-full mt-2"
                  onClick={() => {
                    setEditingReview(null);
                    setNewReview({ reviewContent: "", reviewRating: 0 });
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </form>
          ) : (
            <p className="text-center py-4 bg-gray-100 rounded">
              Please log in to submit a review.
            </p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.reviewId} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <p className="text-lg mb-2">{review.reviewContent}</p>
                <div className="flex items-center mb-2">
                  {renderStars(review.reviewRating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({review.reviewRating}/5)
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  By {review.userName} on{" "}
                  {new Date(review.reviewUpdatedAt).toLocaleDateString()}
                </p>
                {userId === review.userId && (
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      className="btn btn-sm btn-outline btn-info"
                      onClick={() => handleEdit(review)}
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDelete(review.reviewId)}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-4 bg-gray-100 rounded">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
