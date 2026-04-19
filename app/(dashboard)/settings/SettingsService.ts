import { apiClient } from "@/core/api/apiClient";
import { API_ENDPOINTS } from "@/core/api/apiEndpoints";

export interface UserResponse {
    user: {
        id: string;
        name: string;
        email: string;
        profilePictureUrl: string | null;
        location: string;
        dateOfBirth: string;
        phoneNumber: string;
        createdAt: string;
        updatedAt: string;
    }
}



export interface UpdateUserPayload {
    name: string;
    location: string;
    phoneNumber: string;
    dateOfBirth: string;
    profilePictureUrl: string | null;
}

export interface UpdateUserPasswordPayload {
    currentPassword: string;
    newPassword: string;
}



export const settingsService = {
    getUser: async () =>
        apiClient.get<UserResponse>(API_ENDPOINTS.GET_USER),

    updateUser: async (payload: UpdateUserPayload) =>
        apiClient.patch<UserResponse>(API_ENDPOINTS.UPDATE_USER, payload),

    updateUserPassword: async (payload: UpdateUserPasswordPayload) =>
        apiClient.post<UserResponse>(API_ENDPOINTS.CHANGE_USER_PASSWORD, payload),
}