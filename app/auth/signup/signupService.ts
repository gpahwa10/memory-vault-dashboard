import { apiClient } from "@/core/api/apiClient";
import { API_ENDPOINTS } from "@/core/api/apiEndpoints";

 interface SignupResponse {
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

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  location: string;
  dateOfBirth: string;
  phoneNumber: string;
  profilePictureUrl: string | null;
}

export const signupService = {
    signup: async (payload: SignupPayload) =>
        apiClient.post<SignupResponse>(API_ENDPOINTS.SIGNUP, payload),
}