import React from "react";
import { Star, ThumbsUp } from "lucide-react";
import RatingModal from "./RatingModal";
import useModal from "../hooks/useModal";
import { useLikeRatingAction } from "../hooks/useRatingAction";
import PageHeadline from "./PageHeadline";
import ButtonBar from "./ButtonBar";
import type { RatingResponse } from "../common/types/types";
import { getToken } from "../utils/token";
import { useNavigate } from "react-router-dom";
import ImagePreviewModal from "./ImagePreviewModal";
import { getCurrentUserId, getLikesMetaFromApi } from "../utils/likes";
interface Props {
    product_id: string;
    data: RatingResponse | undefined;
    isLoading: boolean;
    isError: boolean;
}
const RatingList: React.FC<Props> = ({ data, isError, isLoading, product_id }) => {
    const { openModal, closeModal, isModalOpen, data: modalData } = useModal();
    const navigate = useNavigate();
    const [pendingId, setPendingId] = React.useState<string | null>(null);
    const { mutate: likeRating } = useLikeRatingAction(product_id);
    const me = getCurrentUserId();
    const handleLike = (ratingId: string) => {
        if (!ratingId) return;
        if (pendingId === ratingId) return;
        setPendingId(ratingId);
        likeRating(ratingId, {
            onSettled: () => {
                setPendingId(null);
            },
            onError: (error) => {
                console.error("Failed to like rating:", error);
                alert("Failed to like the rating. Please try again.");
            },
        });
    };
    const openImage = (imgUrl: string) => {
        openModal(isModalOpen, { imageUrl: imgUrl });
    };
    const closeImage = () => {
        openModal(isModalOpen, { imageUrl: null });
    };
    return (
        <div className="mt-6">
            <PageHeadline title="Review" component={
                <ButtonBar buttons={[
                    {
                        label: "Add", colorClass: "bg-blue-500", onClick: () => !getToken() ? navigate("/login") : openModal({ isRating: true })
                    }
                ]} />
            } />
            {isLoading ? (
                <p>Loading ratings...</p>
            ) : isError ? (
                <p className="text-red-500">Failed to load ratings</p>
            ) : !data?.ratings?.length ? (
                <p className="text-gray-500">No ratings yet. Be the first to review!</p>
            ) : (
                <div className="space-y-4 mt-4 max-h-[40vh] custom-scroll">
                    {data?.ratings?.map((r) => {
                        const { count: likesCount, likedByMe } = getLikesMetaFromApi(r, me);
                        return (
                            <div
                                key={r._id}
                                className="p-4 border rounded-md bg-white shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="font-medium">{r.title || "Untitled"}</div>
                                        <div className="flex items-center text-yellow-400">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    fill={i < (r.rating ?? 0) ? "currentColor" : "none"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {r.user?.name ?? "Anonymous"}
                                    </div>
                                </div>
                                <div className="mt-2 text-gray-700">
                                    {r.description ?? r.comment ?? ""}
                                </div>
                                {Array.isArray(r.images) && r.images.length > 0 && (
                                    <div className="mt-3 flex gap-2 flex-wrap">
                                        {r.images.map((imgUrl, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => openImage(imgUrl)}
                                                className="block w-16 h-16 border rounded-md overflow-hidden bg-gray-50 focus:outline-none"
                                                title="Click to view"
                                            >
                                                <img
                                                    src={imgUrl}
                                                    alt={`review-image-${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                                    <div>
                                        {r.createdAt
                                            ? new Date(r.createdAt).toLocaleDateString()
                                            : ""}
                                    </div>
                                    <button
                                        onClick={() => handleLike(r._id)}
                                        disabled={pendingId === r._id}
                                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition"
                                    >
                                        <ThumbsUp
                                            size={16}
                                            className={likedByMe ? "text-white" : "text-blue-600"}
                                            fill={likedByMe ? "currentColor" : "none"}
                                        />
                                        {likesCount}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            <RatingModal
                show={isModalOpen?.isRating || false}
                handleClose={() => closeModal({ isRating: false })}
                isAdd={true}
                productId={product_id}
            />
            <ImagePreviewModal
                show={Boolean(modalData?.imageUrl)}
                onClose={closeImage}
                imageUrl={modalData?.imageUrl}
            />
        </div>
    );
};
export default RatingList;