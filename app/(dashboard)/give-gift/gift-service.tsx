// postman request POST 'http://localhost:4000/api/gifts' \
//   --header 'Content-Type: application/json' \
//   --body '{
//   "subscriptionPlanId": 1,
//   "giftCardType": "digital",
//   "senderName": "John Doe",
//   "senderEmail": "john@example.com",
//   "senderPhone": "+91 9876543210",
//   "recipientName": "Jane Doe",
//   "recipientEmail": "jane@example.com",
//   "recipientPersonalMessage": "Congratulations on your little one!",
//   "videoMessageUrl": null,
//   "state": "Karnataka",
//   "deliveryDate": null,
//   "couponCode": null
// }'

import { apiClient } from "@/core/api/apiClient";
import { API_ENDPOINTS } from "@/core/api/apiEndpoints";

export interface GiftRequest {
  subscriptionPlanId: number;
  giftCardType: "digital" | "physical";
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  recipientName: string;
  recipientEmail: string;
  recipientPersonalMessage: string;
  videoMessageUrl: string | null;
  state: string;
  deliveryDate: string | null;
  couponCode: string | null;
}

export interface GiftResponseGift {
  id: string;
  userId: string;
  subscriptionPlanId: number;
  giftCardType: "digital" | "physical";
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  recipientName: string;
  recipientEmail: string;
  recipientPersonalMessage: string;
  videoMessageUrl: string | null;
  state: string;
  deliveryDate: string | null;
  couponCode: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GiftResponsePlan {
  id: number;
  name: string;
  price: number;
}

export interface GiftResponse {
  gift: GiftResponseGift;
  plan: GiftResponsePlan;
}


export interface SubscriptionPlanResponse {
    plans: SubscriptionPlan[];
}

export interface SubscriptionPlan { 
    id: number;
    name: string;
    description: string;
    price: number;
    priceUsd: number;
    memoryBookCount: number;
    highlightReelCount: number;
    pagesIncluded: number;
    templateTier: string;
    deliveryFormat: string;
    supportTier: string;
    freeRevisions: boolean;
    sortOrder: number;
    isPopular: boolean;
    isActive: boolean;
    isBestValue: boolean;
    createdAt: string;
    updatedAt: string;
}

export const giftService = {
    postGift: async (request: GiftRequest) => {
        const response = await apiClient.post<GiftResponse>(API_ENDPOINTS.POST_GIFTS, request)
        return response
    },
    getSubscriptionPlans: async () => {
        const response = await apiClient.get<SubscriptionPlanResponse>(API_ENDPOINTS.GET_SUBSCRIPTION_PLANS)
        return response
    }
}   