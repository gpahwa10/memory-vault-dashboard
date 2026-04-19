import { API_ENDPOINTS } from "@/core/api/apiEndpoints";
import { apiClient } from "@/core/api/apiClient";

export interface ReviewRequest {
    rating: number;
    comment: string;
}

export interface ReviewResponse {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export const reviewService = {
    postReview: async (request: ReviewRequest) => {
        const response = await apiClient.post<ReviewResponse>(API_ENDPOINTS.POST_REVIEWS, request)
        return response
    }
}