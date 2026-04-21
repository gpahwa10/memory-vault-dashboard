import { apiClient } from "@/core/api/apiClient"
import { API_ENDPOINTS } from "@/core/api/apiEndpoints"
import { handleApiError } from "@/core/api/apiError"

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        profilePictureUrl: string | null;
        location: string;
        dateOfBirth: string;
        phoneNumber: string;
        role: string;
        createdAt: string;
        updatedAt: string;
    }

}

interface GoogleLoginPayload {
    accessToken: string;
}

export const loginService = {
    login: async (payload: LoginPayload) =>
        apiClient.post<LoginResponse>(API_ENDPOINTS.LOGIN, payload),
    googleLogin: async (payload: GoogleLoginPayload) =>
        apiClient.post<LoginResponse>(API_ENDPOINTS.GOOGLE_LOGIN, payload),
}